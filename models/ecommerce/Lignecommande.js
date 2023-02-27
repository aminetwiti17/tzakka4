const mongoose = require("mongoose");
const Product = require("./Product");
const AutoIncrement = require("mongoose-auto-increment");
AutoIncrement.initialize(mongoose.connection);

const LignecommandeSchema = new mongoose.Schema({
  productID: { type: String, ref: "Product", required: true },
  quantite: { type: Number, required: true, default: 1 },
  prixunite: { type: Number },
  prixtotal: { type: Number },
});
LignecommandeSchema.plugin(AutoIncrement.plugin, {
  model: "Lignecommande",
  field: "_id",
  startAt: 0,
  incrementBy: 1,
});

const Lignecommande = mongoose.model("Lignecommande", LignecommandeSchema);

module.exports = Lignecommande;
