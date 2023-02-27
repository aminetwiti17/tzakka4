const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-auto-increment");
AutoIncrement.initialize(mongoose.connection);
const Product = require("./../ecommerce/Product");
const FactureFournisseur =require('./FactureFournisseur')
const Fournisseur = require('./Fournisseur')
const Lignecommande =require('../../models/ecommerce/Lignecommande')

// Schéma pour la table "commande_fournisseur"
const CommandeFournisseurSchema = new Schema({
 // commandeID: { type: Number, },

  fournisseurID: { type: Number, ref: "Fournisseur" },
  dateCommande: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["En attente", "confirmer", "annuler"],
    default: "En attente",
  },
  total: { type: Number, required: false },
  Facture: {
    type: Number,
    ref: "FactureFournisseur", 
    required :true,
    default:0,
  },
  Lignecommande: [
    {
      type: String,
      ref: "Lignecommande",
    },
  ],

});
CommandeFournisseurSchema.plugin(AutoIncrement.plugin, {
  model: "CommandeFournisseur",
  field: "commandeID",
  startAt: 'CF'+10000,
  incrementBy: 1,
  // Define a custom format for the generated _id values

  
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
        const f= await Fournisseur.findOneAndUpdate(
           { fournisseurID: commande.fournisseurID },
           { $push: { historique_commandes: { CommandeID: commande.commandeID } } },
           { new: true } // Pour retourner le fournisseur mis à jour
         );
        console.log('la commande id ajouter fournisseur',f)
       } catch (err) {
         console.error(err);
         throw err;
       }

      const fac = new FactureFournisseur({
        fournisseurID: commande.fournisseurID,
        date_paiement: commande.dateCommande,
        montant_total: commande.total,
        description: "facture fournisseur",
        numéro_commande: commande.commandeID,
      });
      
      const savedFacture = await fac.save();
      try {
        commande.Facture=savedFacture.numéro_facture;
        const updatedCommande = await commande.save();
        console.log("La commande est mise à jour :", updatedCommande);
        return updatedCommande;
      } catch (err) {
        console.error(err);
        throw err;
        
      }
      
      
   //  Mettre à jour la commande avec l'ID de la facture
      // await CommandeFournisseur.findOneAndUpdate(
      //   { _id: commande._id },
      //   { Facture: savedFacture.numéro_facture },
      //   { new: true } // Pour retourner la commande mise à jour
     // );

      //console.log("La facture est sauvegardée :", savedFacture);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // Sauvegarder la commande mise à jour
  
}

// Exemple d'utilisation dans une route
// app.post("/commandes/:id/traiter", async (req, res) => {
//   try {
//     const commande = await CommandeFournisseur.findById(req.params.id);

//     if (!commande) {
//       return res.status(404).send("La commande n'existe pas");
//     }

//     await traiterCommande(commande);

//     return res.send("La commande est traitée avec succès");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Erreur lors du traitement de la commande");
//   }
// });



const CommandeFournisseur = mongoose.model("CommandeFournisseur",CommandeFournisseurSchema);
module.exports = {CommandeFournisseur,traiterCommande};
