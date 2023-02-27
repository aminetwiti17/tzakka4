const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");
AutoIncrement.initialize(mongoose.connection);
const Lignecommande = require("./Lignecommande");
const Product = require("./Product");
const Factureclient = require('./FactureClient')

const Client = require("../user/Client");


const CommandeSchema = new mongoose.Schema({
  clientID: { type: Number, ref: "Client" },
  adresseID: { type: mongoose.Schema.Types.ObjectId, ref: "Adresse" },
  dateCommande: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["En attente", "confirmer", "annuler"],
    default: "En attente",
  },
  total: { type: Number, required: false, default: 0 },

 
  Facture: {
    type: Number,
    ref: "FactureClient",
    required: false,
    
  },


  Lignecommande: [
    {
      type: String,
      ref: "Lignecommande",
    },
  ],
});
CommandeSchema.plugin(AutoIncrement.plugin, {
  model: "Commande",
  field: "commandeID",
  startAt: 10000,
  incrementBy: 1,
});

// Fonction pour traiter la commande
async function traiterCommande(commande) {
  
  const lignesCommande = await Lignecommande.find({
    _id: { $in: commande.Lignecommande },
  });

  // calculer la total d'après les lignes de commande
  let total = 0;
  for (let i = 0; i < lignesCommande.length; i++) {
    total += lignesCommande[i].prixtotal;
  }
  commande.total = total;

  if (commande.status == "confirmer") {
    try {
      // modifier la quantité de produit commander dans table commande
      for (let ligne of lignesCommande) {
        await Product.findOneAndUpdate(
          { productID: ligne.productID },
          { $inc: { quantity: ligne.quantite } }
        );
      }
      try {
       const f= await Client.findOneAndUpdate(
          { clientID: commande.clientID },
          { $push: { historique_commandes: { CommandeID: commande.commandeID } } },
          { new: true } // Pour retourner le client mis à jour
        );
       console.log('la commande id ajouter client',f)
      } catch (err) {
        console.error(err);
        throw err;
      }



      
      const fac = new Factureclient({
        clientID: commande.clientID,
        adresseID: commande.adresseID,
        date_paiement: commande.dateCommande,
        montant_total: commande.total,
        description: "facture client",
        numéro_commande: commande.commandeID,
      });
      
      const savedFacture = await fac.save();
      try{
      const f= await Commande.findOneAndUpdate(
        { clientID: commande.clientID },
        { commandeID: savedFacture.numéro_facture } ,
        { new: true } // Pour retourner le client mis à jour
      );
     console.log('la facture id ajouter commande',f)
    } catch (err) {
      console.error(err);
      throw err;
    }
 } 
  catch (err) {
  console.error(err);
  throw err;
  }}

 
  
}


const Commande = mongoose.model("Commande", CommandeSchema);
module.exports = {Commande,traiterCommande};
