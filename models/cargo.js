var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CargoSchema = new Schema({
  nombre: { type: String, required: true, maxLength: 100 },
  rank: { type: Number, required: true, default: 3 },
});

CargoSchema.virtual("url").get(function () {
  return "/cargos/" + this._id;
});

module.exports = mongoose.model("Cargo", CargoSchema);
