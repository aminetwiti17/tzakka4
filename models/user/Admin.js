const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");
AutoIncrement.initialize(mongoose.connection);

const AdminSchema = new mongoose.Schema({
  adminID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: 1000000,
  },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

AdminSchema.plugin(AutoIncrement.plugin, {
  model: "Admin",
  field: "adminID",
  startAt: 20000,
  incrementBy: 1,
});
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
