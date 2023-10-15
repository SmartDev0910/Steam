// importing modules
const express = require("express");
const router = express.Router();

// importing controller
const applicationController = require("../controllers/applicationController");

// user -> test
router.get("/application/test", applicationController.test);

router.post("/application/create", applicationController.CreateApplication);

module.exports = router;
