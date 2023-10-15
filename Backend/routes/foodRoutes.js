// importing modules
const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

// importing controller
const foodController = require("../controllers/foodController");

// food -> test
router.get("/food/test", foodController.test);

module.exports = router;
