var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-auto-increment");
AutoIncrement.initialize(mongoose.connection);

var EmployeeSchema = new Schema({
  employeeID: { type: mongoose.Schema.Types.ObjectId },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  ///profils employee
  Évaluation: { type: Number, required: false, min: 0, max: 5 },
  Compétence_matière_de_poste: [String],
  Approche_matière_qualité_travail: { type: String },
  Approche_matière_quantité_travail: { type: String },
  leadershipManagementSkills: { type: String, required: false },
  communicationSkills: { type: String, required: false },
  Commentaires: { type: String, required: false },
  //information bancaire
  bankName: { type: String, required: false },
  branchAddress: { type: String, required: false },
  Iban: { type: String, required: false },
  ///information salaire
  basicPay: { type: Number, required: false },
  overtime: { type: Number, default: 0 },
  conveyanceAllowance: { type: Number, default: 0 },
  salary: {
    type: Number,
    required: false,
  },
  bonus: {
    type: Number,
    default: 0,
  },
  reasonForBonus: {
    type: String,
    default: "N/A",
  },

  //////relation

  Congé: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Congé",
  },
  Mission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mission",
  },
  Presence: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Presence",
  },
});
EmployeeSchema.plugin(AutoIncrement.plugin, {
  model: "Employee",
  field: "employeeID",
  startAt: 111000000,
  incrementBy: 1,
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
