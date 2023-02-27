const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");
AutoIncrement.initialize(mongoose.connection);

const ComptableSchema = new mongoose.Schema({
  comptableID: { type: mongoose.Schema.Types.ObjectId, required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

ComptableSchema.plugin(AutoIncrement.plugin, {
  model: "Comptable",
  field: "comptableID",
  startAt: 10000,
  incrementBy: 1,
});
const Comptable = mongoose.model("Comptable", ComptableSchema);
module.exports = Comptable;
