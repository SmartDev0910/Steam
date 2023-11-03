// importing modules
const express = require("express");
const router = express.Router();

const applicationTypeontroller = require("../controllers/applicationTypeController");

router.get("/", applicationTypeontroller.ListApplicationTypes);
router.get("/:_id", applicationTypeontroller.ListApplicationTypeById);
router.get("/:_id/list", applicationTypeontroller.ListAppliedMembers);

router.post("/create", applicationTypeontroller.CreateApplicationType);

router.put("/:_id", applicationTypeontroller.UpdateApplicationTypeById);

router.delete("/:id", applicationTypeontroller.DeleteApplicationTypeById);

module.exports = router;
