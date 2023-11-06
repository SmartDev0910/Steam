// importing modules
const express = require("express");
const router = express.Router();

const applicationTypeController = require("../controllers/applicationTypeController");

router.get("/", applicationTypeController.ListApplicationTypes);
router.get("/:_id", applicationTypeController.ListApplicationTypeById);
router.get("/:_id/list", applicationTypeController.ListAppliedMembers);

router.post("/create", applicationTypeController.CreateApplicationType);

router.put("/:_id", applicationTypeController.UpdateApplicationTypeById);

router.delete("/:id", applicationTypeController.DeleteApplicationTypeById);

module.exports = router;
