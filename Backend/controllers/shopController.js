// importing models
const Shop = require("../models/shop");

// shop -> test
exports.test = (req, res, next) => {
  res.send("Shop Controller Running Successfully!");
};

// shop -> detail
exports.DetailShop = (req, res, next) => {
  Shop.findById(req.params.id)
    .then((resShop) => {
      res.status(200).send({ status: 200, data: resShop });
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// shop -> all
exports.AllShops = (req, res, next) => {
  Shop.find()
    .then((resShops) => {
      res.status(200).send({ status: 200, data: resShops });
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// shop -> create
exports.CreateShop = (req, res, next) => {
  const newShop = new Shop({
    name: req.body.name || "",
    category: req.body.category || "",
    turnover: req.body.turnover || "",
    status: req.body.status || "",
    creationDate: req.body.creationDate || "",
  });
  newShop
    .save()
    .then((resShop) => {
      res.status(200).send({ status: 200, data: resShop });
    })
    .catch((err) => {
      res.status(400).send({ status: 400, data: err });
    });
};

// shop -> edit
exports.EditShop = (req, res, next) => {
  Shop.findById(req.params.id)
    .then((resShop) => {
      resShop.name = req.body.name;
      resShop.category = req.body.category;
      resShop.turnover = req.body.turnover;
      resShop.status = req.body.status;
      resShop.creationDate = req.body.creationDate;

      resShop
        .save()
        .then((editShop) =>
          res.status(200).send({ status: 200, data: editShop })
        )
        .catch((err) => res.status(400).send({ status: 400, data: err }));
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// shop -> delete
exports.DeleteShop = (req, res, next) => {
  const { id } = req.params;
  Shop.findByIdAndRemove(id)
    .then((removedShop) => {
      res.status(200).send({ status: 200, data: removedShop });
    })
    .catch((err) => {
      res.status(400).send({ status: 400, data: err });
    });
};
