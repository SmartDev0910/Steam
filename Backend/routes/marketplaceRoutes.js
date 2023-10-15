// importing modules
const express = require("express");
const router = express.Router();

// importing controller
const marketplaceController = require("../controllers/marketplaceController");

router.get("/marketplace/test", marketplaceController.test);

router.get("/marketplace/all", marketplaceController.AllMarketplaces);
router.get("/marketplace/applied", marketplaceController.AppliedMarketplaces);
router.get(
  "/marketplace/by-title/:title",
  marketplaceController.MarketplaceByTitle
);
router.get("/marketplace/detail/:id", marketplaceController.DetailMarketplace);

router.post("/marketplace/create", marketplaceController.CreateMarketplace);
router.post("/marketplace/apply/:id", marketplaceController.ApplyMarketplace);
router.post("/marketplace/edit/:id", marketplaceController.EditMarketplace);

router.delete("/marketplace/:id", marketplaceController.DeleteMarketplace);

module.exports = router;
