var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NombramientoSchema = new Schema({
  politico: { type: Schema.Types.ObjectId, ref: "Politico" },
  cargo: { type: Schema.Types.ObjectId, ref: "Cargo" },
});

module.exports = mongoose.model("Nombramiento", NombramientoSchema);
