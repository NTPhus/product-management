const Chat = require("../../models/chat.model");

const uploadToCloudinary = require("../../helper/uploadToCloudinary");

module.exports = (req, res) => {
  const user_id = res.locals.user.id;
  const fullname = res.locals.user.fullname;

  const roomChatId = req.params.roomChatId;

  _io.once("connection", (socket) => {
    socket.join(roomChatId);

    socket.on("CLIENT_SEND_MESSAGE", async (data) => {
      let images = [];

      for (const imageBuffer of data.images) {
        const link = await uploadToCloudinary.uploadToCloudinary(imageBuffer);
        images.push(link);
      }

      //Lưu vào database
      const chat = new Chat({
        user_id: user_id,
        room_chat_id: roomChatId,
        content: data.content,
        images: images,
      });
      await chat.save();

      //Trả data về client
      _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE", {
        user_id: user_id,
        fullname: fullname,
        content: data.content,
        images: images,
      });
    });

    //Typing
    socket.on("CLIENT_SEND_TYPING", async (type) => {
      socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING", {
        user_id: user_id,
        fullname: fullname,
        type: type,
      });
    });
    //End Typing
  });
};
