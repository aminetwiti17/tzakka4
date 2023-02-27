const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produit",
  },
});

const WishList = mongoose.model("WishList", wishlistSchema);

module.exports = WishList;
