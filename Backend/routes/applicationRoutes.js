// importing modules
const express = require("express");
const router = express.Router();

// importing controller
const applicationController = require("../controllers/applicationController");

// application -> test
router.get("/application/test", applicationController.test);

router.get(
  "/application/:steam64",
  applicationController.GetApplicationBySteam64
);

router.post(
  "/application/create/:steam64",
  applicationController.CreateApplication
);

module.exports = router;
