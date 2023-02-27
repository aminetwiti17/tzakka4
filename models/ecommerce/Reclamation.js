const mongoose = require("mongoose");

const ReclamationSchema = new mongoose.Schema({
  descriptionR: String,
  typeR: String,
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

ReclamationSchema.statics.findById = async function (idReclamation) {
  const Reclamation = await this.findOne({ _id: idReclamation });
  return Reclamation;
};

const Reclamation = mongoose.model("Reclamation", ReclamationSchema);

module.exports = Reclamation;
