const mongoose = require("mongoose");
const Transaction = require("./Transaction");

const AvanceSchema = new mongoose.Schema({
  employeeID: {
    type: Number,
    ref: "Employee",
    required: false,
  },
  montant: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: { type: String },
});

AvanceSchema.pre("save", async function (next) {
  try {
    const transaction = new Transaction({
      type: "debit",
      description: `avance sur salaire pour l'employé ${this.employeeID}`,
      montant: this.montant,
      compteOrigine: 4155, // le compte du salaire
      compteDestination: this.employeeID, // le compte de l'employé
    });
    console.log(transaction);
    await transaction.save();
    console.log("La transaction est sauvegardée.");
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

const Avance = mongoose.model("Avance", AvanceSchema);

module.exports = Avance;
