const mongoose = require("mongoose");
const Transaction = require("./Transaction");

const DepenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: false,
  },

  produit: {
    type: String,
    required: false,
  },
  numeroDeCommande: {
    type: String,
    required: false,
  },
  statutDeCommande: {
    type: String,
    required: false,
  },
  montant: {
    type: Number,
    required: true,
  },
  lieu: {
    type: String,
    required: false,
  },
  justificatif: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
});

DepenseSchema.pre("save", async function (next) {
  try {
    const transaction = new Transaction({
      type: "debit",
      description: this.description,
      montant: this.montant,
      compteOrigine: 200000, // le compte du salaire
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

const Depense = mongoose.model("Depense", DepenseSchema);

module.exports = Depense;
