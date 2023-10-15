// importing models
const Marketplace = require("../models/marketplace");

// marketplace -> test
exports.test = (req, res, next) => {
  res.send("Marketplace Controller Running Successfully!");
};

// marketplace -> applied
exports.AppliedMarketplaces = (req, res, next) => {
  Marketplace.find({ applied: true })
    .then((resMarketplace) => {
      res.status(200).send({ status: 200, data: resMarketplace });
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// marketplace -> by-title
exports.MarketplaceByTitle = (req, res, next) => {
  Marketplace.findOne({ title: req.params.title })
    .then((resMarketplace) => {
      if (resMarketplace)
        res.status(200).send({ status: 200, data: resMarketplace });
      else res.status(404).send({ status: 404, data: "No Exist" });
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// marketplace -> detail
exports.DetailMarketplace = (req, res, next) => {
  Marketplace.findById(req.params.id)
    .then((resMarketplace) => {
      res.status(200).send({ status: 200, data: resMarketplace });
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// marketplace -> all
exports.AllMarketplaces = (req, res, next) => {
  Marketplace.find()
    .then((resMarketplaces) => {
      res.status(200).send({ status: 200, data: resMarketplaces });
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// marketplace -> create
exports.CreateMarketplace = (req, res, next) => {
  const newMarketplace = new Marketplace({
    title: req.body.title || "",
    description: req.body.description || "",
    plans: req.body.plans || "",
    pricing: req.body.pricing || "",
    logoUrl: req.body.logoUrl || "",
    applied: req.body.applied,
    category: req.body.category || "",
  });
  newMarketplace
    .save()
    .then((resMarketplace) => {
      res.status(200).send({ status: 200, data: resMarketplace });
    })
    .catch((err) => {
      res.status(400).send({ status: 400, data: err });
    });
};

// marketplace -> edit
exports.EditMarketplace = (req, res, next) => {
  Marketplace.findById(req.params.id)
    .then((resMarketplace) => {
      resMarketplace.title = req.body.title;
      resMarketplace.description = req.body.description;
      resMarketplace.plans = req.body.plans;
      resMarketplace.pricing = req.body.pricing;
      resMarketplace.category = req.body.category;
      resMarketplace.logoUrl = req.body.logoUrl;
      resMarketplace.applied = req.body.applied;

      resMarketplace
        .save()
        .then((editMarketplace) =>
          res.status(200).send({ status: 200, data: editMarketplace })
        )
        .catch((err) => res.status(400).send({ status: 400, data: err }));
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// marketplace -> apply -> :id
exports.ApplyMarketplace = (req, res, next) => {
  const { id } = req.params;
  Marketplace.findById(id)
    .then((resMarketplace) => {
      resMarketplace.applied = req.body.applied;

      resMarketplace
        .save()
        .then((editMarketplace) =>
          res.status(200).send({ status: 200, data: editMarketplace })
        )
        .catch((err) => res.status(400).send({ status: 400, data: err }));
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// marketplace -> delete
exports.DeleteMarketplace = (req, res, next) => {
  const { id } = req.params;
  Marketplace.findByIdAndRemove(id)
    .then((removedMarketplace) => {
      res.status(200).send({ status: 200, data: removedMarketplace });
    })
    .catch((err) => {
      res.status(400).send({ status: 400, data: err });
    });
};
