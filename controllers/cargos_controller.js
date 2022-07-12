const async = require("async");
const { body, validationResult } = require("express-validator");
const { render } = require("pug");
const Cargo = require("../models/cargo");

exports.cargos_get = function (req, res, next) {
  Cargo.find()
    .sort("nombre")
    .exec((err, cargos) => {
      if (err) {
        return next(err);
      } else {
        res.render("cargos", { title: "Cargos", data: cargos });
      }
    });
};

exports.nuevo_get = function (req, res, next) {
  res.send("Pendiente nuevo cargo GET");
};

exports.nuevo_post = function (req, res, next) {
  res.send("Pendiente nuevo cargo POST");
};
