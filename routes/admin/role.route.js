const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/role.controller");

router.get("/", controller.index);

router.get("/create", controller.create);

router.get("/edit/:id", controller.edit);

router.post("/create", controller.createPost);

router.patch("/edit/:id", controller.editPatch);

module.exports = router;