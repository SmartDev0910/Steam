// importing modules
const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

// importing controller
const videoController = require("../controllers/videoController");

router.get("/video/test", videoController.test);

router.get("/video/viewers/gender", videoController.ViewersGender);
router.get("/video/viewers/age", videoController.ViewersAge);
router.get("/video/total", videoController.TotalVideos);
router.get("/video/total/count", videoController.TotalVideoCounts);
router.get("/video/total/incomes", videoController.TotalIncomes);
router.get("/video/week-views", videoController.WeekViewsData);
router.get("/video/watch-time", videoController.WatchTimeData);

// video -> upload
router.post("/video/upload", videoController.Upload);
router.post("/video/by-fan", videoController.VideosByFan);
router.post("/video/edit/category/:id", videoController.EditVideoCategory);

router.delete("/video/:id", videoController.DeleteVideo);

module.exports = router;
