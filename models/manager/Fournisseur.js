const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");
AutoIncrement.initialize(mongoose.connection);
const Compte = require("../comptable/Compte");

const fournisseurSchema = new mongoose.Schema({
  fournisseurID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: 111000000,
  },
  nom: { type: String, required: true },
  adresse: { type: String, required: true },
  téléphone: { type: String, required: true },
  email: { type: String, required: true },
  numéro_TVA: { type: String },
  numéro_SIRET: { type: String },
  nom_contact_principal: { type: String },
  adresse_livraison: { type: String },
  //conditions_paiement: { type: String },
  historique_commandes: [
    {
      CommandeID: {
        type: Number,
        ref: "commande",
      },
    },
    
  ],  notes_internes: { type: String },
});
fournisseurSchema.plugin(AutoIncrement.plugin, {
  model: "Fournisseur",
  field: "fournisseurID",
  startAt: 333000000,
  incrementBy: 1,
});

/////enregitrement compteFournisseur lors de enregistrement un fournisseur
fournisseurSchema.pre("save", async function (next) {
  try {
    const nouveauCompte = new Compte({
      compteID: this.fournisseurID,
      nom_compte: this.nom,
      type: "Fournisseur",
    });
    await nouveauCompte.save();
    return nouveauCompte;
  } catch (err) {
    console.error(err);
    throw err;
  }
});

const Fournisseur = mongoose.model("Fournisseur", fournisseurSchema);

module.exports = Fournisseur;
