const mongoose = require("mongoose");

const compteSchema = new mongoose.Schema({
  compteID: {
    type: Number,
    refPath: "Type",
    required: false,
  },

  Type: {
    type: String,
    enum: ["Client", "Fournisseur", "Entreprise", "Employee", "Autre"],
    required: false,
  },

  nom_compte: {
    type: String,
    required: true,
  },

  solde: {
    type: Number,
    default: 0,
  },

  solde_courant: {
    type: Number,
    default: 0,
  },
  paiements_en_attente: {
    type: Number,
    default: 0,
  },
  remises: {
    type: Number,
    default: 0,
  },
  avoirs: {
    type: Number,
    default: 0,
  },
  historique_paiements: {
    type: String,
  },
  encours: {
    type: Number,
    default: 0,
  },
  limites_crédit: {
    type: Number,
    default: 0,
  },
  réductions: {
    type: Number,
    default: 0,
  },
  solvabilité: { type: String },
});

async function creerNouveauCompte(compteID, nom_compte, type_compte) {
  try {
    const nouveauCompte = new Compte({
      compteID: compteID,
      nom_compte: nom_compte,
      type: type_compte,
    });
    await nouveauCompte.save();
    return nouveauCompte;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const Compte = mongoose.model("Compte", compteSchema);

module.exports = { Compte, creerNouveauCompte };
