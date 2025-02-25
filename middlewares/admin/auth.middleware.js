const { prefixAdmin } = require("../../config/system");
const Account = require("../../models/account.model");

module.exports.requireAuth = async (req, res) => {
    if(!req.cookies.token){
        res.redirect(`${prefixAdmin}/admin/auth`);
    }else{
        const user = await Account.findOne({token: req.cookies.token});
        if(!user){
            res.redirect(`${prefixAdmin}/admin/auth`);
        }else{
            next();
        }
    }
}