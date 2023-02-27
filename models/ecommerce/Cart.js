const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");
AutoIncrement.initialize(mongoose.connection);

const CartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produit",
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  
  prixtotal: {
    type: Number,
    default: 0,
  },
  
});

CartSchema.pre("save", function (next) {
  this.prixtotal = this.prixtotal + product.prix * this.quantité;
  next();
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
