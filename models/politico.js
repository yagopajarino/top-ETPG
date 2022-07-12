var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PoliticoSchema = new Schema({
  nombre: { type: String, required: true, maxLength: 100 },
  apellido: { type: String, required: true, maxLength: 100 },
  image_url: { type: String, required: true, default: "" },
  descripcion: { type: String, required: false },
});

PoliticoSchema.virtual("name").get(function () {
  var fullname = "";
  if (this.nombre && this.apellido) {
    fullname = this.apellido + ", " + this.nombre;
  }
  if (!this.nombre || !this.apellido) {
    fullname = "";
  }
  return fullname;
});

PoliticoSchema.virtual("url").get(function () {
  return "/politicos/" + this._id;
});

module.exports = mongoose.model("Politico", PoliticoSchema);
