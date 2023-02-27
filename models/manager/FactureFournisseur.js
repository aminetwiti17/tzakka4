const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");
AutoIncrement.initialize(mongoose.connection);
const Transaction = require('../comptable/Transaction');
const CommandeFournisseur = require('../manager/CommandeFournisseur');


const FactureFournisseurSchema = new mongoose.Schema({
  fournisseurID: { type: Number, ref: "Fournisseur", required: true },
  numéro_facture: { type: Number, unique: true },
  date_facture: { type: Date, required: true,default: Date.now },
  montant_total: { type: Number, required: true },
  description: { type: String, required: false },
  numéro_commande: { type: String, default: "N/A"},
  numéro_bon_livraison: { type: String,default: "N/A" },
  numéro_TVA_intracom: { type: String ,default: "N/A"},
  frais_port: { type: Number , default: 0  },
  remises: { type: Number , default: 0 },
  taxes_diverses: { type: Number , default: 0  },
  notes_internes: { type: String ,default: "N/A"},
  date_paiement: { type: Date, required: false },
  montant_paiement: { type: Number, required: false, default: 0  },
  montant_reste: { type: Number, required: false , default: 0 },
  méthode_paiement: { type: String, required: false,default: "N/A" },
  
});

FactureFournisseurSchema.plugin(AutoIncrement.plugin, {
  model: "FactureFournisseur",
  field: "numéro_facture",
  startAt: 607000000,
  incrementBy: 1,
});

FactureFournisseurSchema.pre("save", async function (next) {
  // if ((this.statufature = "payé")) {
    try {
      const transaction = new Transaction({
        type: "debit",
        description: this.description,
        montant: this.montant_total,
        compteOrigine: 200000, // compte d'entreprise
        compteDestination: this.fournisseurID,
      });
      console.log(transaction);
      x=await transaction.save();
      console.log("La transaction est sauvegardée.",x);
     // next();
    } catch (err) {
      console.error(err);
      next(err);
    }
    // await CommandeFournisseur.findOneAndUpdate(
    //   { _id: this.numéro_commande },
    //   { Facture: this.numéro_facture },
    //   { new: true } // Pour retourner la commande mise à jour
    // );
    // console.log("La facture est sauvegardée :" );
  
});

const FactureFournisseur = mongoose.model(
  "FactureFournisseur",
  FactureFournisseurSchema
);

module.exports = FactureFournisseur;
