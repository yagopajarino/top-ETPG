const async = require("async");
const { body, validationResult } = require("express-validator");
const { render } = require("pug");
const Gabinete = require("../models/gabinete");
const nombramiento = require("../models/nombramiento");
const Politico = require("../models/politico");
const Cargo = require("../models/cargo");

exports.gabinetes_get = function (req, res, next) {
  Gabinete.find()
    .populate({ path: "nombramientos", populate: { path: "politico" } })
    .populate({ path: "nombramientos", populate: { path: "cargo" } })
    .exec((err, gabinetes) => {
      if (err) {
        return next(err);
      } else {
        res.render("gabinetes", { title: "Gabinetes", data: gabinetes });
      }
    });
};

exports.gabinete_detail = function (req, res, next) {
  Gabinete.findById(req.params.id)
    .populate({ path: "nombramientos", populate: { path: "politico" } })
    .populate({ path: "nombramientos", populate: { path: "cargo" } })
    .exec((err, result) => {
      if (err) {
        return next(err);
      }
      if (result == null) {
        let err = new Error("Gabinete not found");
        res.status = 404;
        return next(err);
      }
      let nombramientos = result.nombramientos.sort(
        (a, b) => a.cargo.rank - b.cargo.rank
      );
      res.render("gabinete_detail", {
        title: "Gabinete id: " + result.id,
        nombramientos,
        votos: result.votos,
        creacion: result.creation,
      });
    });
};

exports.nuevo_get = function (req, res, next) {
  async.parallel(
    {
      politicos: function (callback) {
        Politico.find(callback);
      },
      cargos: function (callback) {
        Cargo.find(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render("gabinete_form", {
        title: "Nuevo gabinete",
        politicos: results.politicos,
        cargos: results.cargos,
      });
    }
  );
};

exports.nuevo_post = function (req, res, next) {
  res.send("Pendiente nuevo gabinente POST");
};
