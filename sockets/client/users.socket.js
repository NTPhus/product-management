const User = require("../../models/user.model");

module.exports = (res) => {
  _io.once("connection", (socket) => {
    socket.on("CLIENT_ADD_FRIEND", async (userId) => {
        const myUserId = res.locals.user.id;
        //Thêm id của A và acceptFriends của B
        const existIdAinB = await User.findOne({
            _id: userId,
            acceptFriends: myUserId
        });

        if(!existIdAinB){
            await User.updateOne({
                _id: userId
            }, {
                $push: {acceptFriends : myUserId}
            });
        }

        //Thêm id của A và requestFriends của B
        const existIdBinA = await User.findOne({
            _id: myUserId,
            requestFriends: userId
        });

        if(!existIdBinA){
            await User.updateOne({
                _id: myUserId
            }, {
                $push: {requestFriends : userId}
            });
        }
    });
  });
};
