const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Compte = require("./Compte");
const Transaction = require("./Transaction");

const FichedePaieSchema = new Schema({
  entreprise: {
    nom: { type: String, required: false },
    logo: { type: String },
    adresse: { type: String, required: false },
    telephone: { type: String },
    email: { type: String },
  },
  employee: {
    employeeID: { type: Number, ref: "Employee", required: false },
    nom: { type: String, required: false },
    adresse: { type: String, required: false },
  },
  periode: {
    debut: { type: Date, required: false },
    fin: { type: Date, required: false },
  },
  gains: {
    salaireBase: { type: Number, required: false },
    heuresSupplementaires: { type: Number },
    primeRendement: { type: Number },
    indemnitesRepasTransport: { type: Number },
    autresAvantages: { type: Number },
  },
  retenues: {
    cotisationsSociales: { type: Number },
    impotRevenu: { type: Number },
    cotisationsSyndicales: { type: Number },
    avancesRemboursables: { type: Number },
  },
  salaireNet: { type: Number, required: false },
  informationsComplementaires: {
    congesPayesAcquis: { type: Number },
    congesPayesPris: { type: Number },
    joursFeriesTravailles: { type: Number },
    tauxMajorationJoursFeries: { type: Number },
    heuresTravailEffectuees: { type: Number },
    tauxHoraire: { type: Number },
    remboursementsFraisProfessionnels: { type: Number },
  },
  transactionID: {
    type: Schema.Types.ObjectId,
    ref: "Transaction",
    required: false,
  },
});

FichedePaieSchema.pre("save", async function (next) {
  try {
    const transaction = new Transaction({
      type: "debit",
      description: `Fiche de paie pour l'employé ${this.employee.employeeID}`,
      montant: this.salaireNet,
      compteOrigine: 200000, // le compte du salaire
      compteDestination: this.employee.employeeID, // le compte de l'employé
    });
     x= await transaction.save();
    console.log("La transaction est sauvegardée" ,x);
    this.transactionID = x._id;
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

const FichedePaie = mongoose.model("FichedePaie", FichedePaieSchema);

module.exports = FichedePaie;
