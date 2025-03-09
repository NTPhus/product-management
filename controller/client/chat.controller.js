const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
const RoomChat = require("../../models/rooms-chat.model");

const chatSocket = require("../../sockets/client/chat.socket");

//[GET] /chat/:roomChatId
module.exports.index = async (req, res) => {
    const roomChatId = req.params.roomChatId;

    const titleRoomChat = await RoomChat.findOne({
        _id: roomChatId
    }).select("title");
    //SocketIO
    chatSocket(req, res);
    //end SocketIO

    //Lấy data từ database
    const chats = await Chat.find({
        room_chat_id: roomChatId,
        deleted: false
    }).limit(10);

    for(const chat of chats){
        const infoUser = await User.findOne({
            _id: chat.user_id
        }).select("fullname");

        chat.infoUser = infoUser;  
    }

    res.render("client/pages/chat/index", {
        pageTitle: "Chat",
        chats: chats,
        chatTitle: titleRoomChat.title
    })
}