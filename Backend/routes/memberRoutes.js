// importing modules
const express = require("express");
const router = express.Router();

// importing controller
const memberController = require("../controllers/memberController");

// user -> test
router.get("/members/test", memberController.test);
router.get("/members/all", memberController.GetAllMembers);
router.get("/members/detail/:steam64", memberController.DetailMember);
router.get(
  "/members/whitelist/:steam64",
  memberController.GetWhiteListedBySteam64
);

router.post("/members/signin", memberController.SignIn);
router.post("/members/create", memberController.CreateMember);
router.post("/members/update/:steam64", memberController.UpdateMember);
router.post(
  "/members/whitelist/:steam64",
  memberController.SetWhiteListedBySteam64
);
router.post("/members/ban/:steam64", memberController.SetBannedBySteam64);

router.delete("/members/:id", memberController.DeleteMember);

module.exports = router;
