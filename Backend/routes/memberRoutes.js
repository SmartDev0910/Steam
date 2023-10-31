// importing modules
const express = require("express");
const router = express.Router();

const memberController = require("../controllers/memberController");

router.get("/api/members", memberController.ListMembers);
router.get("/api/members/:_id", memberController.ListMemberById);

router.post("/api/members/signin", memberController.SignIn);
router.post("/api/members/signup", memberController.CreateMember);
router.post("/api/members/:_id/apply", memberController.Apply);
router.post("/api/members/:_id/review_application", memberController.ReviewApplication);

router.put("/api/members/:_id", memberController.UpdateMemberById);

router.delete("/api/members/:id", memberController.DeleteMemberById);

module.exports = router;
