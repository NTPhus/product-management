const express = require("express");
const router = express.Router();
const validate = require("../../validates/client/user.validate")

const controller = require("../../controller/client/user.controller");

router.get("/register", controller.register);

router.post("/register",validate.registerPost, controller.registerPost);

router.get("/login", controller.login);

router.post("/login", controller.loginPost);

router.get("/logout", controller.logout);

router.get("/password/forgot", controller.forgotPassword);

router.post("/password/forgot",validate.forgotPasswordPost, controller.forgotPasswordPost);

module.exports = router;