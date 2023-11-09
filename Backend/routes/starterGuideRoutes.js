// importing modules
const express = require("express");
const router = express.Router();

const starterGuideController = require("../controllers/starterGuideController");

router.get("/", starterGuideController.ListStarterGuides);
router.post("/create", starterGuideController.CreateStarterGuide);
router.put("/:_id", starterGuideController.UpdateStarterGuideById);

module.exports = router;
