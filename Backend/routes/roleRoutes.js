// importing modules
const express = require("express");
const router = express.Router();

const roleController = require("../controllers/roleController");

router.get("/", roleController.ListRoles);
router.get("/:roleID", roleController.ListRoleById);

router.post("/create", roleController.CreateRole);

router.put("/:_id", roleController.UpdateRoleById);

router.delete("/:id", roleController.DeleteRoleById);

module.exports = router;
