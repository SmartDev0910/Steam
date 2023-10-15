// importing models
const Fan = require("../models/fan");
const WatchTime = require("../models/watchtime");
const WeekView = require("../models/weekView");
const DateUtil = require("../utils/date");

const md5 = require("md5");

// fan -> test
exports.test = (req, res, next) => {
  res.send("Fan Controller Running Successfully!");
};

// fan -> detail
exports.DetailFan = (req, res, next) => {
  Fan.findById(req.params.id)
    .then((resFan) => {
      res.status(200).send({ status: 200, data: resFan });
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// fan -> all
exports.AllFans = (req, res, next) => {
  Fan.find()
    .then((resFans) => {
      res.status(200).send({ status: 200, data: resFans });
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// fan -> SignIn
exports.SignIn = (req, res, next) => {
  Fan.findOne({ email: req.body.email })
    .then((result) => {
      if (result) {
        if (result.password !== md5(req.body.password))
          res.status(401).send({ status: 401, data: "Password is incorrect" });
        else res.status(200).send({ status: 200, data: result });
      } else
        res.status(404).send({ status: 404, data: "Fan is not registered" });
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// fan -> create
exports.CreateFan = (req, res, next) => {
  const newFan = new Fan({
    firstName: req.body.firstName || "",
    lastName: req.body.lastName || "",
    email: req.body.email || "",
    phoneNumber: req.body.phoneNumber || "",
    password: md5(req.body.password || "123456"),
    birthDate: req.body.birthDate || "",
    gender: req.body.gender || "",
    favouriteCountry: req.body.favouriteCountry || "",
    favouriteTeam: req.body.favouriteTeam || "",
    favouritePlayer: req.body.favouritePlayer || "",
    interest: req.body.interest || "",
    role: req.body.role || "",
    ageGroup: req.body.ageGroup || "",
  });

  Fan.findOne({ email: req.body.email })
    .then((result) => {
      if (!result) {
        newFan
          .save()
          .then((resFan) => {
            res.status(200).send({ status: 200, data: resFan });
          })
          .catch((err) => {
            res.status(400).send({ status: 400, data: err });
          });
      } else {
        res.status(409).send({ status: 409, data: "Already Exists!" });
      }
    })
    .catch((err) => {
      res.status(400).send({ status: 400, data: err });
    });
};

// fan -> edit
exports.EditFan = (req, res, next) => {
  Fan.findById(req.params.id)
    .then((resFan) => {
      resFan.firstName = req.body.firstName || "";
      resFan.lastName = req.body.lastName || "";
      resFan.email = req.body.email || "";
      resFan.gender = req.body.gender || "";
      resFan.password = resFan.password;
      resFan.birthDate = resFan.birthDate;
      resFan.interest = resFan.interest;
      resFan.favouriteCountry = req.body.favouriteCountry || "";
      resFan.favouriteTeam = req.body.favouriteTeam || "";
      resFan.favouritePlayer = req.body.favouritePlayer || "";
      resFan.watchingPlace = req.body.watchingPlace || "Remote";
      resFan.role = req.body.role || "";
      resFan.ageGroup = req.body.ageGroup || "";

      resFan
        .save()
        .then((editFan) => res.status(200).send({ status: 200, data: editFan }))
        .catch((err) => res.status(400).send({ status: 400, data: err }));
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// fan -> delete
exports.DeleteFan = (req, res, next) => {
  const { id } = req.params;
  Fan.findByIdAndRemove(id)
    .then((removedFan) => {
      res.status(200).send({ status: 200, data: removedFan });
    })
    .catch((err) => {
      res.status(400).send({ status: 400, data: err });
    });
};

// fan -> password -> :id
exports.ChangeFanPassword = (req, res, next) => {
  const { id } = req.params;
  Fan.findById(id)
    .then((resFan) => {
      if (resFan.password !== md5(req.body.currentPassword)) {
        res.status(404).send({ status: 404, data: "Password Wrong!" });
      } else {
        resFan.password = md5(req.body.newPassword);
        resFan
          .save()
          .then((editFan) =>
            res.status(200).send({ status: 200, data: editFan })
          )
          .catch((err) => res.status(404).send({ status: 404, data: err }));
      }
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// fan -> watch-video
exports.DidWatchVideo = async (req, res, next) => {
  try {
    const watchTimeData = await WatchTime.findOne({
      watchDate: DateUtil.today(),
    });

    if (watchTimeData) {
      watchTimeData[DateUtil.watchTimeAttr()]++;
      await watchTimeData.save();
    } else {
      let newWatchTime = new WatchTime({
        watchDate: DateUtil.today(),
      });
      newWatchTime[DateUtil.watchTimeAttr()] = 1;
      await newWatchTime.save();
    }

    const weekViewData = await WeekView.findOne({
      week: DateUtil.currentWeek(),
    });

    if (weekViewData) {
      weekViewData[DateUtil.weekViewAttr()]++;
      await weekViewData.save();
    } else {
      let newWeekView = new WeekView({
        week: DateUtil.currentWeek(),
      });
      newWeekView[DateUtil.weekViewAttr()] = 1;
      await newWeekView.save();
    }

    res.status(200).send({
      status: 200,
      data: "Success",
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      data: err,
    });
  }
};
