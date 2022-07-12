const async = require("async");
const { body, validationResult } = require("express-validator");
const { render } = require("pug");
const Gabinete = require("../models/gabinete");
const nombramiento = require("../models/nombramiento");

exports.gabinetes_get = function (req, res, next) {
  Gabinete.find()
    .populate({ path: "nombramientos", populate: { path: "politico" } })
    .populate({ path: "nombramientos", populate: { path: "cargo" } })
    .exec((err, gabinetes) => {
      if (err) {
        return next(err);
      } else {
        console.log(gabinetes);
        res.render("gabinetes", { title: "Gabinetes", data: gabinetes });
      }
    });
};

exports.nuevo_get = function (req, res, next) {
  res.send("Pendiente nuevo gabinente GET");
};

exports.nuevo_post = function (req, res, next) {
  res.send("Pendiente nuevo gabinente POST");
};
