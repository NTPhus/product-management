const mongoose = require("mongoose");
const generate = require("../helper/generate");

const userSchema = new mongoose.Schema(
    {   
        fullname: String,
        email: String,
        password: String,
        tokenUser: String,
        phone: String,
        avatar: String,
        status: {
            type: String,
            default: "active"
        },
        requestFriends: Array, //Lời mời đã gửi
        acceptFriends: Array, //Lời mờ đã nhận
        friendList: [ // Danh sách bạn bè
            {
                user_id: String,
                room_chat_id: String
            }
        ],
        statusOnline: String,
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema, "users");

module.exports = User;