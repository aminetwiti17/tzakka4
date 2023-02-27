const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  description: String,
  image: String,
  name: String,
  prix: Number,

  Lignecommande: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lignecommande",
  },
});

const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;
