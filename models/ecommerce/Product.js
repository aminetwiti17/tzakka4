const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");
AutoIncrement.initialize(mongoose.connection);

const ProductSchema = new mongoose.Schema({
  productID: { type: String },
  description: String,
  image: String,
  nom: String,
  price: Number,
  quantity: Number,

  categorieID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categorie",
    required: false,
  },
  fournisseurID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fournisseur",
    required: false,
  },
  // Lignecommande: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Lignecommande",
  // },
});

ProductSchema.plugin(AutoIncrement.plugin, {
  model: "Product",
  field: "productID",
  startAt: 500,
  incrementBy: 1,
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;

// get productID() {
//   return this._productID;
// },
// set productID(value) {
//   this._productID = value;
// },
