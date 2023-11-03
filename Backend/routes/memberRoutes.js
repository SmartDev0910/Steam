// importing modules
const express = require("express");
const router = express.Router();

const memberController = require("../controllers/memberController");

router.get("/", memberController.ListMembers);
router.get("/:_id", memberController.ListMemberById);

router.post("/:_id/change_password", memberController.ChangePassword);
router.post("/:_id/apply", memberController.Apply);
router.post("/:_id/review_application", memberController.ReviewApplication);

router.put("/:_id", memberController.UpdateMemberById);

router.delete("/:id", memberController.DeleteMemberById);

module.exports = router;
