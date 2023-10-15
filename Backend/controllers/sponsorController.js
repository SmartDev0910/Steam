// importing models
const Sponsor = require("../models/sponsor");

// sponsor -> test
exports.test = (req, res, next) => {
  res.send("Sponsor Controller Running Successfully!");
};

// sponsor -> detail
exports.DetailSponsor = (req, res, next) => {
  Sponsor.findById(req.params.id)
    .then((resSponsor) => {
      res.status(200).send({ status: 200, data: resSponsor });
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// sponsor -> all
exports.AllSponsors = (req, res, next) => {
  Sponsor.find()
    .then((resSponsors) => {
      res.status(200).send({ status: 200, data: resSponsors });
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// sponsor -> create
exports.CreateSponsor = (req, res, next) => {
  const newSponsor = new Sponsor({
    sponsorName: req.body.sponsorName || "",
    contactFullName: req.body.contactFullName || "",
    email: req.body.email || "",
    mobile: req.body.mobile || "",
    category: req.body.category || "",
    dealsize: req.body.dealsize || "",
    creationDate: req.body.creationDate || "",
    status: req.body.status || "",
    logoUrl: req.body.logoUrl || "",
  });
  newSponsor
    .save()
    .then((resSponsor) => {
      res.status(200).send({ status: 200, data: resSponsor });
    })
    .catch((err) => {
      res.status(400).send({ status: 400, data: err });
    });
};

// sponsor -> edit
exports.EditSponsor = (req, res, next) => {
  Sponsor.findById(req.params.id)
    .then((resSponsor) => {
      resSponsor.logoUrl = req.body.logoUrl;
      resSponsor.category = req.body.category;
      resSponsor.contactFullName = req.body.contactFullName;
      resSponsor.creationDate = req.body.creationDate;
      resSponsor.dealsize = req.body.dealsize;
      resSponsor.mobile = req.body.mobile;
      resSponsor.sponsorName = req.body.sponsorName;
      resSponsor.status = req.body.status;
      resSponsor.email = req.body.email;
      resSponsor.about = req.body.about;
      resSponsor.description = req.body.description;

      resSponsor
        .save()
        .then((editSponsor) =>
          res.status(200).send({ status: 200, data: editSponsor })
        )
        .catch((err) => res.status(400).send({ status: 400, data: err }));
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// sponsor -> delete
exports.DeleteSponsor = (req, res, next) => {
  const { id } = req.params;
  Sponsor.findByIdAndRemove(id)
    .then((removedSponser) => {
      res.status(200).send({ status: 200, data: removedSponser });
    })
    .catch((err) => {
      res.status(400).send({ status: 400, data: err });
    });
};
