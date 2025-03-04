const Chat = require("../../models/chat.model");

const uploadToCloudinary = require("../../helper/uploadToCloudinary");

module.exports = (res) => {
  const user_id = res.locals.user.id;
  const fullname = res.locals.user.fullname;

  _io.once("connection", (socket) => {
    socket.on("CLIENT_SEND_MESSAGE", async (data) => {
      let images = [];

      for (const imageBuffer of data.images) {
        const link = await uploadToCloudinary.uploadToCloudinary(imageBuffer);
        images.push(link);
      }

      //Lưu vào database
      const chat = new Chat({
        user_id: user_id,
        content: data.content,
        images: images,
      });
      await chat.save();

      //Trả data về client
      _io.emit("SERVER_RETURN_MESSAGE", {
        user_id: user_id,
        fullname: fullname,
        content: data.content,
        images: images,
      });
    });

    //Typing
    socket.on("CLIENT_SEND_TYPING", async (type) => {
      socket.broadcast.emit("SERVER_RETURN_TYPING", {
        user_id: user_id,
        fullname: fullname,
        type: type,
      });
    });
    //End Typing
  });
};
