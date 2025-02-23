const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/role.controller");

router.get("/", controller.index);

router.get("/create", controller.create);

router.get("/edit/:id", controller.edit);

router.post("/create", controller.createPost);

router.patch("/edit/:id", controller.editPatch);

router.get("/permissions", controller.permissions);

router.patch("/permissions", controller.permissionsPatch);

module.exports = router;