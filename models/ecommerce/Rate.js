const mongoose = require("mongoose");

const RateSchema = new mongoose.Schema({
  rate: {
    type: Number,
    min: 1,
    max: 5,
  },
  commentaire: String,

  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },
  produit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produit",
  },
});
RateSchema.statics.findById = async function (idRate) {
  const Rate = await this.findOne({ _id: idRate });
  return Rate;
};
const Rate = mongoose.model("Rate", RateSchema);

module.exports = Rate;
