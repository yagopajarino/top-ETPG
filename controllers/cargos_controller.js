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
  res.render("cargo_form", { title: "Nuevo cargo" });
};

exports.nuevo_post = [
  body("nombre", "Completar nombre del cargo")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  function (req, res, next) {
    let rank = req.body.nombre.match(".*Ministro.*") ? 3 : 4;
    const errors = validationResult(req);
    let cargo = new Cargo({ nombre: req.body.nombre, rank: rank });
    if (!errors.isEmpty()) {
      res.render("cargo_form", {
        title: "Nuevo cargo",
        cargo: cargo,
        errors: errors.array(),
      });
      return;
    } else {
      Cargo.findOne({ nombre: req.body.nombre }).exec(function (err, result) {
        if (err) {
          return next(err);
        }
        if (result) {
          res.redirect("/cargos");
        } else {
          cargo.save(function (err) {
            if (err) {
              return next(err);
            }
            res.redirect("/cargos");
          });
        }
      });
    }
  },
];
