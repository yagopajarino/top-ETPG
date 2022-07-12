var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GabineteSchema = new Schema({
  nombramientos: [{ type: Schema.Types.ObjectId, ref: "Nombramiento" }],
  votos: { type: Number, required: true, default: 0 },
  creation: { type: Date, required: true, value: new Date() },
});

GabineteSchema.virtual("url").get(function () {
  return "/gabinetes/" + this._id;
});

module.exports = mongoose.model("Gabinete", GabineteSchema);
