const mongoose = require('mongoose');

const adresseSchema = new mongoose.Schema({
    clientID:{type : Number,required: true, },

  nom_destinataire: {
    type: String,
    required: true,
    default:'N/A',
  },
  ligne1: {
    type: String,
    required: true,
    default:'N/A',
  },
  ligne2: {
    type: String,
    default:'N/A',
  },
  ville: {
    type: String,
    required: true,
    default:'N/A',
  },
  code_postal: {
    type: String,
    required: true,
    default:'N/A',
  },
  pays: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    default:'N/A',
  },
  email: {
    type: String,
    default:'N/A',
  },
  status: {
    type: String,
    default:'N/A',
  },
});

const Adresse = mongoose.model('Adresse', adresseSchema);

module.exports = Adresse;
