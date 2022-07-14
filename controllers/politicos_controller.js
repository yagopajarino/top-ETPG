const async = require("async");
const { body, validationResult } = require("express-validator");
const { render } = require("pug");
const Politico = require("../models/politico");
const saveImage = require("../helpers/saveImage");

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
  res.render("politico_form", { title: "Nuevo político" });
};

exports.nuevo_post = [
  body("nombre", "Completar nombre").trim().isLength({ min: 1 }).escape(),
  body("apellido", "Completar apellido").trim().isLength({ min: 1 }).escape(),
  body("image_url", "Completar url de imagen")
    .trim()
    .isLength({ min: 1 })
    .isURL(),

  function (req, res, next) {
    const errors = validationResult(req);
    let datos = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      image_url: req.body.image_url,
      descripcion: req.body.descripcion || "",
    };
    let politico = new Politico(datos);
    if (!errors.isEmpty()) {
      res.render("Politico_form", {
        title: "Nuevo politico",
        politico: politico,
        errors: errors.array(),
      });
      return;
    } else {
      let ext;
      const reg = /.*.(jpg|JPG|jpeg|png|gif|GIF)$/i;
      let arr = req.body.image_url.match(reg);
      if (arr == null) {
        ext = ".png";
      } else {
        ext = arr[1];
      }
      let filename = `./public/images/${
        req.body.nombre + req.body.apellido + "." + ext
      }`;
      saveImage(req.body.image_url, filename).then(() => {
        politico.image_url = `/images/${
          req.body.nombre + req.body.apellido + "." + ext
        }`;
        Politico.findOne({ nombre: req.body.nombre }).exec(function (
          err,
          result
        ) {
          if (err) {
            return next(err);
          }
          if (result) {
            res.redirect(result.url);
          } else {
            politico.save(function (err) {
              if (err) {
                return next(err);
              }
              res.redirect(politico.url);
            });
          }
        });
      });
    }
  },
];
