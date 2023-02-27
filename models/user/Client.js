const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");
AutoIncrement.initialize(mongoose.connection);

const ClientSchema = new mongoose.Schema({
  clientID: { type: Number },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  numéro_TVA: { type: String ,default:'N/A '},
  numéro_SIRET: { type: String ,default:'N/A '},
  nom_contact_principal: { type: String ,default:'N/A '},
  adresse_livraison: [
    {
      livraisonID:{ type: String ,default:'N/A ' }
    }
  ],
  conditions_paiement: { type: String,default:'N/A ' },
  historique_commandes: [
    {
      CommandeID: {
        type: Number,
        ref: "commande",
      },
    },
    
  ],

  ReaclamationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reclamation",
  },
  CommandeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Commande",
  },
  CartID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  WishlistID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wishlist",
  },

  DevisID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Devis",
  },
});

ClientSchema.plugin(AutoIncrement.plugin, {
  model: "Client",
  field: "clientID",
  startAt: 222000000,
  incrementBy: 1,
});

const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;
