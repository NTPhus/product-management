const mongoose = require("mongoose");
const generate = require("../helper/generate");

const accountSchema = new mongoose.Schema(
    {   
        fullname: String,
        email: String,
        password: String,
        token: {
            type: String,
            default: generate.generateRandomString(20)
        },
        phone: String,
        avatar: String,
        role_id: String,
        status: String,
        product_category_id: {
            type: String, 
            default: ""
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAd: Date
    },
    {
        timestamps: true
    }
);

const Account = mongoose.model("Account", accountSchema, "accounts");

module.exports = Account;