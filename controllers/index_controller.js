const async = require("async");
const { body, validationResult } = require("express-validator");
const { render } = require("pug");
let Gabinete = require("../models/gabinete");

exports.getIndex = function (req, res, next) {
  Gabinete.find()
    .sort("creation")
    .populate({ path: "nombramientos", populate: { path: "politico" } })
    .populate({ path: "nombramientos", populate: { path: "cargo" } })
    .limit(10)
    .exec((err, gabs) => {
      if (err) {
        return next(err);
      } else {
        res.render("index", { title: "Elige Tu Propio Gabinete", data: gabs });
      }
    });
};
