// importing modules
const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

// importing controller
const clubController = require("../controllers/clubController");

// club -> test
router.get("/club/test", clubController.test);

module.exports = router;
