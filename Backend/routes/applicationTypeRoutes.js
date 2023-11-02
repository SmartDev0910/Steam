// importing modules
const express = require("express");
const router = express.Router();

const applicationTypeontroller = require("../controllers/applicationTypeController");

router.get("/api/application_types", applicationTypeontroller.ListApplicationTypes);
router.get("/api/application_types/:_id", applicationTypeontroller.ListApplicationTypeById);
router.get("/api/application_types/:_id/list", applicationTypeontroller.ListAppliedMembers);

router.post("/api/application_types/create", applicationTypeontroller.CreateApplicationType);

router.put("/api/application_types/:_id", applicationTypeontroller.UpdateApplicationTypeById);

router.delete("/api/application_types/:id", applicationTypeontroller.DeleteApplicationTypeById);

module.exports = router;
