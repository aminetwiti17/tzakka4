const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");
AutoIncrement.initialize(mongoose.connection);
const {Compte} = require("./Compte");
const GrandLivre = require("./Grandlivre");

const TransactionSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  type: { type: String, enum: ["crédit", "debit"], required: true },
  description: { type: String, required: true },
  montant: { type: Number, required: true },
  modeDePaiement: { type: String, required: false },
  categorie: { type: String, required: false },
  compteOrigine: { type: Number, ref: "Compte", required: false },
  compteDestination: { type: Number, ref: "Compte", required: false },
  statut: { type: String, required: false },
});

TransactionSchema.pre("save", async function (next) {
  try {
    const compteOrigines = await Compte.findOne({
      compteID: this.compteOrigine,
    });
    const compteDestinations = await Compte.findOne({
      compteID: this.compteDestination,
    });
    const grandLivreEntry = new GrandLivre({
      date: this.date,
      libelle: this.description,
      compte: this.compteOrigine,
      solde: this.montant,
      transactionID: this._id,
    });

    if (this.type === "debit") {
      compteOrigines.solde -= this.montant;
      compteDestinations.solde += this.montant;
      grandLivreEntry.debit = this.montant;
    } else { 

      compteOrigines.solde += this.montant;
      compteDestinations.solde -= this.montant;
      grandLivreEntry.credit = this.montant;
    }

    x1=await compteDestinations.save();
    x2=await compteOrigines.save();

    x3 =await grandLivreEntry.save();
    console.log("le compte destinateur est modifier " ,x1);
    console.log("le compte origines est modifier " ,x2);
    console.log("sauvgarder la transaction da grandlivre : " , x3);
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//     // // Enregistrement de la transaction dans le grand livre

///compte.solde_courant = solde;

//     // const grandLivreEntry = new GrandLivre({

//     //   solde: doc.montant,
//     //   compte: doc.compte,

//     // });

//     // await grandLivreEntry.save();

// //   } catch(error) {
// //     next(error);}

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
