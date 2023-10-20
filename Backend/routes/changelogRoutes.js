// importing modules
const express = require("express");
const router = express.Router();

// importing controller
const changelogController = require("../controllers/changelogController");

// change-log -> test
router.get("/change-log/test", changelogController.test);

router.get("/change-log/all", changelogController.GetAllChangeLogs);

router.post("/change-log/create", changelogController.CreateChangeLog);

router.delete("/change-log/:id", changelogController.DeleteChangeLog);

module.exports = router;
