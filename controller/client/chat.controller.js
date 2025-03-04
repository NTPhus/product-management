const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

//[GET] /chat/
module.exports.index = async (req, res) => {
    const user_id = res.locals.user.id;

    //SocketIO
    _io.once('connection', (socket) => {
        socket.on("CLIENT_SEND_MESSAGE",async (content) => {
            //Lưu vào database
            const chat = new Chat({
                user_id,
                content,
            });
            await chat.save();
        })
    });
    //end SocketIO

    //Lấy data từ database
    const chats = await Chat.find({
        deleted: false
    })

    for(const chat of chats){
        const infoUser = await User.findOne({
            _id: chat.user_id
        }).select("fullname");

        chat.infoUser = infoUser;  
    }

    res.render("client/pages/chat/index", {
        pageTitle: "Chat",
        chats: chats
    })
}