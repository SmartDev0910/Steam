// importing modules
const express = require("express");
const router = express.Router();

// importing controller
const sponsorController = require("../controllers/sponsorController");

// sponsor -> test
router.get("/sponsor/test", sponsorController.test);

router.get("/sponsor/detail/:id", sponsorController.DetailSponsor);
router.get("/sponsor/all", sponsorController.AllSponsors);
router.post("/sponsor/create", sponsorController.CreateSponsor);
router.post("/sponsor/edit/:id", sponsorController.EditSponsor);

router.delete("/sponsor/:id", sponsorController.DeleteSponsor);

module.exports = router;
