// importing modules
const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

// importing controller
const fanController = require("../controllers/fanController");

// fan -> test
router.get("/fan/test", fanController.test);

router.get("/fan/detail/:id", fanController.DetailFan);
router.get("/fan/all", fanController.AllFans);

router.post("/fan/create", fanController.CreateFan);
router.post("/fan/edit/:id", fanController.EditFan);
router.post("/fan/password/:id", fanController.ChangeFanPassword);
router.post("/fan/signin", fanController.SignIn);
router.post("/fan/watch-video", fanController.DidWatchVideo);

router.delete("/fan/:id", fanController.DeleteFan);

module.exports = router;
