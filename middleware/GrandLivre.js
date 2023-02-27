// calculerSoldeInitial(dateDebut): Cette fonction calcule le solde initial du grand livre à partir d'une date de début spécifiée.
// Elle effectue une requête sur les transactions et les opérations qui ont été effectuées avant cette date et calcule le solde initial.

async function calculerSoldeInitial(dateDebut) {
  const operations = await GrandLivre.find({ date: { $lt: dateDebut } });
  let soldeInitial = 0;
  operations.forEach((operation) => {
    soldeInitial += operation.debit - operation.credit;
  });
  return soldeInitial;
}

// getTransactions(dateDebut, dateFin): Cette fonction récupère toutes les transactions effectuées entre deux dates spécifiées et
// retourne une liste des transactions.

async function getTransactions(dateDebut, dateFin) {
  const transactions = await GrandLivre.find({
    date: { $gte: dateDebut, $lte: dateFin },
  })
    .populate("compte", "nom_compte type_compte")
    .populate("transactionID", "type");
  return transactions;
}

//// calculerSolde(dateDebut, dateFin): Cette fonction calcule le solde du grand livre entre deux dates spécifiées. Elle utilise la
// fonction getTransactions pour récupérer toutes les transactions entre les deux dates et calcule le solde.

async function calculerSolde(dateDebut, dateFin) {
  const soldeInitial = await calculerSoldeInitial(dateDebut);
  const transactions = await getTransactions(dateDebut, dateFin);
  let solde = soldeInitial;
  transactions.forEach((transaction) => {
    if (
      transaction.transactionID.type === "Facture client" ||
      transaction.transactionID.type === "Fiche de paie"
    ) {
      solde += transaction.debit - transaction.credit;
    } else {
      solde -= transaction.debit - transaction.credit;
    }
    transaction.solde = solde;
  });
  return transactions;
}

// ajouterTransaction(transaction): Cette fonction ajoute une transaction au grand livre. Elle calcule le nouveau solde du compte
///concerné par la transaction et crée une nouvelle entrée dans le grand livre.

async function ajouterTransaction(transaction) {
  const compte = await Compte.findById(transaction.compte);
  const solde = compte.solde_courant + transaction.debit - transaction.credit;
  const grandLivreEntry = new GrandLivre({
    date: transaction.date,
    libelle: transaction.libelle,
    compte: transaction.compte,
    debit: transaction.debit,
    credit: transaction.credit,
    solde: solde,
    transactionID: transaction._id,
  });
  await grandLivreEntry.save();
  compte.solde_courant = solde;
  await compte.save();
}

module.exports = {
  GrandLivre,
  calculerSoldeInitial,
  getTransactions,
  calculerSolde,
  ajouterTransaction,
};

const GrandLivreSchema = new Schema({
  date: { type: Date, required: true },
  libelle: { type: String, required: true },
  compte: { type: Number, ref: "Compte", required: true },
  debit: { type: Number, default: 0 },
  credit: { type: Number, default: 0 },
  solde: { type: Number, required: true },
  transactionID: {
    type: Schema.Types.ObjectId,
    ref: "Transaction",
    required: true,
  },
});

// ajouter une transaction au grand livre
async function ajouterTransaction(transaction) {
  const grandLivre = new GrandLivre({
    date: transaction.date,
    libelle: transaction.libelle,
    compte: transaction.compte,
    debit: transaction.type === "debit" ? transaction.montant : 0,
    credit: transaction.type === "credit" ? transaction.montant : 0,
    solde: 0,
    transactionID: transaction._id,
  });
  await grandLivre.save();
}

// modifier une transaction existante dans le grand livre
async function modifierTransaction(transaction) {
  const grandLivre = await GrandLivre.findOne({
    transactionID: transaction._id,
  });
  if (grandLivre) {
    grandLivre.date = transaction.date;
    grandLivre.libelle = transaction.libelle;
    grandLivre.debit = transaction.type === "debit" ? transaction.montant : 0;
    grandLivre.credit = transaction.type === "credit" ? transaction.montant : 0;
    await grandLivre.save();
  }
}

// supprimer une transaction existante du grand livre
async function supprimerTransaction(transaction) {
  const grandLivre = await GrandLivre.findOne({
    transactionID: transaction._id,
  });
  if (grandLivre) {
    const solde = grandLivre.solde;
    await grandLivre.delete();
    // mettre à jour le solde du compte concerné par la transaction supprimée
    const compte = await Compte.findOne({ numero: grandLivre.compte });
    if (compte) {
      compte.solde -= solde;
      await compte.save();
    }
  }
}

// récupérer toutes les entrées du grand livre entre deux dates spécifiées
async function getEntries(dateDebut, dateFin) {
  return await GrandLivre.find({
    date: { $gte: dateDebut, $lte: dateFin },
  }).populate("compte");
}

// générer un rapport du grand livre entre deux dates spécifiées
grandLivreSchema.statics.genererRapport = async function (dateDebut, dateFin) {
  const entries = await this.getEntries(dateDebut, dateFin);
  let soldeCourant = 0;
  let rapport = "";

  rapport +=
    "Rapport du Grand Livre entre " + dateDebut + " et " + dateFin + "\n\n";
  rapport +=
    "Date".padEnd(20) +
    "Libellé".padEnd(30) +
    "Débit".padEnd(15) +
    "Crédit".padEnd(15) +
    "Solde Courant\n";

  for (let entry of entries) {
    let date = entry.date ? entry.date.toDateString() : "";
    let libelle = entry.libelle
      ? entry.libelle.substring(0, 30).padEnd(30)
      : "".padEnd(30);
    let debit = entry.debit
      ? entry.debit.toFixed(2).toString().padEnd(15)
      : "".padEnd(15);
    let credit = entry.credit
      ? entry.credit.toFixed(2).toString().padEnd(15)
      : "".padEnd(15);

    soldeCourant += entry.debit - entry.credit;
    rapport +=
      date.padEnd(20) +
      libelle +
      debit +
      credit +
      soldeCourant.toFixed(2) +
      "\n";
  }

  rapport +=
    "\nSolde courant du Grand Livre : " + soldeCourant.toFixed(2) + "\n";

  return rapport;
};
