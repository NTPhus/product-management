const Account = require("../../models/account.model");
var md5 = require("md5");

// [GET] /admin/my-account/
module.exports.index = async (req, res) => {
    res.render("admin/pages/my-account/index", {
        pageTitle: "Thông tin cá nhân"
    });
};

// [GET] /admin/my-account/edit
module.exports.edit = async (req, res) => {
    res.render("admin/pages/my-account/edit", {
        pageTitle: "Chỉnh sửa thông tin cá nhân"
    });
};

// [PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
    const id = req.locals.user.id;

    const emailExist = await Account.findOne({
      _id: { $ne: id}, //ne: not equal
      email: req.body.email,
      deleted: false,
    });
  
    if (emailExist) {
      req.flash("error", `Email ${req.body.email} đã tồn tại`);
    }else{
      
      if (req.body.password) {
        req.body.password= md5(req.body.password);
      } else {
        delete req.body.password;
      }
      await Account.updateOne({_id: id}, req.body);
    
      req.flash("success", "Cập nhật thông tin tài khoản thành công");
    }
  
    res.redirect("back");
};