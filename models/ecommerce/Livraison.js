const mongoose = require("mongoose");

const LivraisonSchema = new mongoose.Schema({
  numéro_commande: {
    type: String,
    ref: "Commande",
    required: true,
  },
  factureID: {
    type: Number,
    ref: "Facture",
    required: true,
  },

  adresseID: { type: mongoose.Schema.Types.ObjectId, ref: "Adresse", required: true , },

  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["encours", "confirmer", "annuler", "livrais", "en magasin"],
    default: "encours",
  },
 
});

const Livraison = mongoose.model("Livraison", LivraisonSchema);

module.exports = Livraison;
