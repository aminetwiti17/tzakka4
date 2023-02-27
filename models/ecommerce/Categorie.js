const mongoose = require("mongoose");

const CategorieSchema = new mongoose.Schema({
  descriptionC: String,
  typeC: String,
  name: String,
  produitID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produit",
  },
});

const Categorie = mongoose.model("Categorie", CategorieSchema);

module.exports = Categorie;
