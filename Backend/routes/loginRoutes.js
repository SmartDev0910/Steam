// importing modules
const express = require("express");
const router = express.Router();

const memberController = require("../controllers/memberController");

router.post("/signin", memberController.SignIn);
router.post("/signup", memberController.CreateMember);

module.exports = router;
