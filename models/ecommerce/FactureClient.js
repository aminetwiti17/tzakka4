const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");
AutoIncrement.initialize(mongoose.connection);

const Transaction = require("../comptable/Transaction");
const Livraison = require("./Livraison");


const FactureClientSchema = new mongoose.Schema({
  clientID: { type: Number, ref: "Client", required: true },
  adresseID: { type: mongoose.Schema.Types.ObjectId, ref: "Adresse", required: true , },
  numéro_facture: { type: Number, unique: true },
  date_facture: { type: Date, required: true ,default :Date.now,},
  montant_total: { type: Number, required: true },
  description: { type: String, required: true, default: "N/A" },
  numéro_commande: { type: String, ref: "Commmande", default: "N/A" },
  numéro_bon_livraison: { type: String, default: "N/A" },
  numéro_TVA_intracom: { type: String, default: "N/A" },
  frais_port: { type: Number, default: 0 },
  remises: { type: Number, default: 0 },
  taxes_diverses: { type: Number, default: 0 },
  notes_internes: { type: String, default: "N/A" },
  date_paiement: { type: Date, required: false },
  montant_paiement: { type: Number, required: false, default: 0  },
  montant_reste: { type: Number, required: false , default: 0 },
  méthode_paiement: { type: String, required: false,default: "N/A" },
  

  livraison: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Livraison",
    required: false,
    get: function(value) {
      return value ? value.toString() : null;
    },
    set: function(value) {
      return value ? mongoose.Types.ObjectId(value) : null;
    },
  },
});
FactureClientSchema.plugin(AutoIncrement.plugin, {
  model: "FactureClient",
  field: "numéro_facture",
  startAt: 606000000,
  incrementBy: 1,
});




FactureClientSchema.post("save", async function (doc,next) {
    /// cree un livraison
    try{
      const livraison = new Livraison({
        adresseID :this.adresseID,
        numéro_commande :this.numéro_facture,
        factureID :this.numéro_commande
      })
      const liv =await livraison.save();
      console.log("La livraison est sauvegardée. : ", liv);
      this.livraison = liv.id;
    } catch (err) {
      console.error(err);
      next(err);
    }




  //  sauvgarder comme transaction
    try {
      const transaction = new Transaction({
        type: "crédit",
        description: this.description,
        montant: this.montant_total,
        compteOrigine: 200000, //
        compteDestination: this.clientID,
      });
      await transaction.save();
      console.log("La transaction est sauvegardée. : ", transaction);
      
    } catch (err) {
      console.error(err);
      next(err);
    }
  
});

const FactureClient = mongoose.model("FactureClient", FactureClientSchema);

module.exports = FactureClient;
