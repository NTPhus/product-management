const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

//[GET] /chat/
module.exports.index = async (req, res) => {
    const user_id = res.locals.user.id;
    const fullname = res.locals.user.fullname;

    //SocketIO
    _io.once('connection', (socket) => {
        socket.on("CLIENT_SEND_MESSAGE",async (content) => {
            //Lưu vào database
            const chat = new Chat({
                user_id,
                content,
            });
            await chat.save();

            //Trả data về client
            _io.emit("SERVER_RETURN_MESSAGE", {
                user_id: user_id,
                fullname: "",
                content: content
            });
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