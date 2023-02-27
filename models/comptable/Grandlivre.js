const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");
AutoIncrement.initialize(mongoose.connection);

const Schema = mongoose.Schema;

const grandLivreSchema = new Schema({
  date: { type: Date, required: false },
  libelle: { type: String, required: false },
  compte: { type: Number, ref: "Compte", required: true },
  debit: { type: Number },
  credit: { type: Number },
  solde: { type: Number, required: true },
  transactionID: {
    type: Schema.Types.ObjectId,
    ref: "Transaction",
    required: false,
  },
});

const Grandlivre = mongoose.model("Grandlivre", grandLivreSchema);

module.exports = Grandlivre;
