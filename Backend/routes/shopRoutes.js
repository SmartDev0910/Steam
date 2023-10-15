// importing modules
const express = require("express");
const router = express.Router();

// importing controller
const shopController = require("../controllers/shopController");

// shop -> test
router.get("/shop/test", shopController.test);

router.get("/shop/detail/:id", shopController.DetailShop);
router.get("/shop/all", shopController.AllShops);

router.post("/shop/create", shopController.CreateShop);
router.post("/shop/edit/:id", shopController.EditShop);

router.delete("/shop/:id", shopController.DeleteShop);

module.exports = router;
