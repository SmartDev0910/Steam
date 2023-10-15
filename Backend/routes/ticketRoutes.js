// importing modules
const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

// importing controller
const ticketController = require("../controllers/ticketController");

// ticket -> test
router.get("/ticket/test", ticketController.test);

module.exports = router;
