const async = require("async");
const { body, validationResult } = require("express-validator");
const { render } = require("pug");
const Politico = require("../models/politico");

exports.politicos_get = function (req, res, next) {
  Politico.find()
    .sort("name")
    .exec((err, politicos) => {
      if (err) {
        return next(err);
      } else {
        res.render("politicos", { title: "Políticos", data: politicos });
      }
    });
};

exports.details_get = function (req, res, next) {
  Politico.findById(req.params.id).exec((err, result) => {
    if (err) {
      return next(err);
    }
    if (result == null) {
      let err = new Error("Politico not found");
      res.status = 404;
      return next(err);
    }
    res.render("politico_detail", {
      title: result.name,
      data: result,
    });
  });
};

exports.nuevo_get = function (req, res, next) {
  res.send("Pendiente nuevo político GET");
};

exports.nuevo_post = function (req, res, next) {
  res.send("Pendiente nuevo político POST");
};
