const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");
AutoIncrement.initialize(mongoose.connection);

// const Compte = require('./comptable/Compte');
// const User = require('./User');

const ManagerSchema = new mongoose.Schema({
  managerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: 2000000,
  },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

ManagerSchema.plugin(AutoIncrement.plugin, {
  model: "Manager",
  field: "managerID",
  startAt: 40000,
  incrementBy: 1,
});
const Manager = mongoose.model("manager", ManagerSchema);
module.exports = Manager;
