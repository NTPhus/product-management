const User = require("../../models/user.model");
const Cart = require("../../models/cart.model");
const ForgotPassword = require("../../models/forgot-password.model");
const generateHelper = require("../../helper/generate");
const sendMailHelper = require("../../helper/sendMail");
const md5 = require("md5");

//[GET] /user/register/
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng kí tài khoản",
  });
};

//[POST] /user/register/
module.exports.registerPost = async (req, res) => {
  console.log(req.body);

  const existEmail = await User.findOne({
    email: req.body.email,
  });

  if (existEmail) {
    req.flash("error", "Email đã tồn tại");
    res.redirect("back");
    return;
  }

  req.body.password = md5(req.body.password);

  const user = new User(req.body);
  user.tokenUser = generateHelper(20);
  user.save();

  req.flash("success", "Tạo tài khoản thành công");

  res.cookie("tokenUser", user.tokenUser);

  res.redirect("/");
};

//[GET] /user/login/
module.exports.login = async (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Đăng nhập tài khoản",
  });
};

//[POST] /user/login/
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect("back");
    return;
  }

  if (!md5(password) == user.password) {
    req.flash("error", "Mật khẩu không chính xác");
    res.redirect("back");
    return;
  }

  if (user.status === "inactive") {
    req.flash("error", "Tài khoản đang bị khóa");
    res.redirect("back");
    return;
  }

  const cart = await Cart.findOne({
    user_id: user.id
  })  

  if(cart){
    res.cookie("cartId", cart.id);
  }else{
    await Cart.updateOne({
      _id: req.cookies.cartId
    }, {
      user_id: user.id
    })
  }

  res.cookie("tokenUser", user.tokenUser);

  await User.updateOne({
    tokenUser: user.tokenUser
  }, {
    statusOnline: "online"
  })

  _io.once('connection', (socket) => {
    socket.broadcast.emit("SERVER_RETURN_USER_STATUS_ONLINE", {
      userId: user.id,
      status: "online"
    });
  })

  res.redirect("/");
};

//[GET] /user/logout/
module.exports.logout = async (req, res) => {
  await User.updateOne({
    tokenUser: req.cookies.tokenUser
  }, {
    statusOnline: "offline"
  })
  res.clearCookie("tokenUser");
  res.clearCookie("cardId");

  _io.once('connection', (socket) => {
    socket.broadcast.emit("SERVER_RETURN_USER_STATUS_ONLINE", {
      userId: res.locals.user.id,
      status: "offline"
    });
  })
  res.redirect("/");
};

//[GET] /password/forgot
module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot-password", {
    pageTitle: "Lấy lại mật khẩu",
  });
};

//[POST] /password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    req.flash("error", "Email không tồn tại!");
    res.redirect("back");
    return;
  }

  //Lưu thông tin vào DB
  const otp = generateHelper.generateRandomNumber(8);

  const objectForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now(),
  };

  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();

  // Nếu email tồn tại thì gửi OTP qua email
  const subject = "Mã OTP xác minh lấy lại mật khẩu";
  const html = `
    Mã OTP để lấy lại mật khẩu là <b>${OTP}</b>. Thời hạn sử dụng là 3 phút.
  `;
  sendMailHelper.sendMail(email, subject, html);

  res.redirect(`/user/password/otp?email=${email}`);
};

//[GET] /password/otp
module.exports.otpPassword = async (req, res) => {
  const email = req.query.email;

  res.render("client/pages/user/otp-password", {
    pageTitle: "Nhập mã OTP",
    email: email,
  });
};

//[POST] /password/otp
module.exports.otpPasswordPost = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp,
  });

  if (!result) {
    req.flash("error", "OTP không hợp lệ");
    res.redirect("back");
    return;
  }

  const user = await User.findOne({
    email: email,
  });

  res.cookie("tokenUser", user.tokenUser);

  res.redirect("/user/password/reset");
};

//[GET] /password/reset
module.exports.resetPassword = async (req, res) => {
  res.render("client/pages/user/reset-password", {
    pageTitle: "Đổi mật khẩu",
  });
};

//[POST] /password/reset
module.exports.resetPasswordPost = async (req, res) => {
  const password = req.body.password;
  const tokenUser = req.cookies.tokenUser;

  await User.updateOne(
    {
      tokenUser: tokenUser,
    },
    {
      password: md5(password),
    }
  );

  res.redirect("/");
};

//[GET] /info
module.exports.info = async (req, res) => {
  res.render("client/pages/user/info", {
    pageTitle: "Thông tin tài khoản"
  });
};