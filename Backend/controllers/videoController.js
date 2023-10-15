// importing models
const Video = require("../models/video");
const WatchTime = require("../models/watchtime");
const WeekView = require("../models/weekView");
const DateUtil = require("../utils/date");

// video -> test
exports.test = (req, res, next) => {
  res.send("Video Controller Running Successfully!");
};

// video -> total
exports.TotalVideos = async (req, res, next) => {
  Video.find()
    .then((result) => {
      res.status(200).send({
        status: 200,
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: 400,
        data: err,
      });
    });
};

// video -> total -> income
exports.TotalIncomes = async (req, res, next) => {
  Video.find()
    .then((result) => {
      let totalIncomes = 0;
      if (result) {
        result.map((item) => {
          totalIncomes += item.income;
        });
      }
      res.status(200).send({
        status: 200,
        data: totalIncomes,
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: 400,
        data: err,
      });
    });
};

// video -> total -> counts
exports.TotalVideoCounts = async (req, res, next) => {
  try {
    const totalCount = await Video.countDocuments();

    res.status(200).send({
      status: 200,
      data: totalCount,
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      data: err,
    });
  }
};

// video -> viewers -> gender
exports.ViewersGender = async (req, res, next) => {
  try {
    const bothCount = await Video.countDocuments({ gender: "Both" });
    const maleCount = await Video.countDocuments({ gender: "Male" });
    const femaleCount = await Video.countDocuments({ gender: "Female" });

    res.status(200).send({
      status: 200,
      data: { both: bothCount, male: maleCount, female: femaleCount },
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      data: err,
    });
  }
};

exports.ViewersAge = async (req, res, next) => {
  try {
    let age018 = 0;
    let age1830 = 0;
    let age3150 = 0;
    let age5170 = 0;
    let age71 = 0;

    const videos = await Video.find();

    for (const video of videos) {
      const ageGroup = JSON.parse(video.ageGroup);

      ageGroup.forEach((age) => {
        switch (age) {
          case "age018":
            age018++;
            break;
          case "age1830":
            age1830++;
            break;
          case "age3150":
            age3150++;
            break;
          case "age5170":
            age5170++;
            break;
          case "age71":
            age71++;
            break;
        }
      });
    }

    res.status(200).send({
      status: 200,
      data: {
        age018: age018,
        age1830: age1830,
        age3150: age3150,
        age5170: age5170,
        age71: age71,
      },
    });
  } catch (err) {
    res.status(400).send({ status: 400, data: err });
  }
};

// video -> week-views
exports.WeekViewsData = async (req, res, next) => {
  WeekView.findOne({ week: DateUtil.currentWeek() })
    .then((result) => {
      res.status(200).send({
        status: 200,
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: 400,
        data: err,
      });
    });
};

// video -> watch-time
exports.WatchTimeData = async (req, res, next) => {
  WatchTime.findOne({ watchDate: DateUtil.today() })
    .then((result) => {
      res.status(200).send({
        status: 200,
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: 400,
        data: err,
      });
    });
};

// video -> upload
exports.Upload = (req, res, next) => {
  const newVideo = new Video({
    title: req.body.title || "",
    description: req.body.description || "",
    gender: req.body.gender || "",
    ageGroup: req.body.ageGroup || "[]",
    countries: req.body.countries || "[]",
    uploadTo: req.body.uploadTo || "[]",
    videoUrl: req.body.videoUrl || "",
    clicksCount: req.body.clicksCount || 0,
    viewsCount: req.body.viewsCount || 0,
    income: req.body.income || 0,
    source: req.body.source || "",
    category: req.body.category || "",
    adSponsorName: req.body.adSponsorName || "",
    adLogoUrl: req.body.adLogoUrl || "",
    adDescription: req.body.adDescription || "",
    adAction: req.body.adAction || "",
    adPrice: req.body.adPrice || "",
    adActionColor: req.body.adActionColor || "",
  });
  newVideo
    .save()
    .then((resVideo) => {
      res.status(200).send({ status: 200, data: resVideo });
    })
    .catch((err) => {
      res.status(400).send({ status: 400, data: err });
    });
};

// video -> by-fan
exports.VideosByFan = (req, res, next) => {
  Video.find()
    .then((result) => {
      let resVideos = [];
      if (result) {
        for (const item of result) {
          if (
            item.countries.includes(req.body.favouriteCountry) &&
            item.uploadTo.includes("FanZone")
          ) {
            resVideos.push(item);
          }
        }
      }
      res.status(200).send({
        status: 200,
        data: resVideos,
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: 400,
        data: err,
      });
    });
};

// video -> edit -> category
exports.EditVideoCategory = (req, res, next) => {
  Video.findById(req.params.id)
    .then((resVideo) => {
      resVideo.category = req.body.category;

      resVideo
        .save()
        .then((editVideo) =>
          res.status(200).send({ status: 200, data: editVideo })
        )
        .catch((err) => res.status(400).send({ status: 400, data: err }));
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// video -> delete
exports.DeleteVideo = (req, res, next) => {
  const { id } = req.params;
  Video.findByIdAndRemove(id)
    .then((removedVideo) => {
      res.status(200).send({ status: 200, data: removedVideo });
    })
    .catch((err) => {
      res.status(400).send({ status: 400, data: err });
    });
};
