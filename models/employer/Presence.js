const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const PresenceSchema = new mongoose.Schema({
  employeeID: { type: Schema.Types.ObjectId, ref: "employee", required: true },

  date: { type: Date, default: Date.now, required: true },
  present: { type: Boolean, required: true },
});

const Presence = mongoose.model("Presence", PresenceSchema);
module.exports = Presence;
