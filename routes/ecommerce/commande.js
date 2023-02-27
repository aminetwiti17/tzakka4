const express = require("express");
const router = express.Router();
const {Commande,traiterCommande} = require("../../models/ecommerce/Commande");
const auth = require("../../middleware/auth");
const Client = require("../../models/user/Client");

///////////////////    get     /////////////////////////////////////////////////////////

router.get("/", auth, async (req, res) => {
  try {
    const Commandes = await Commande.find();
    res.json(Commandes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCommandeById(req, res, next) {
  try {
    commande = await Commande.findById(req.params.id);
    if (commande == null) {
      return res.status(404).json({ message: "Cannot find Commande" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.commandes = commande;
  next();
}

///////////////////    get by id    /////////////////////////////////////////////////////////

router.get("/:id", getCommandeById, auth, (req, res) => {
  res.json(res.commandes);
});

/////////////////////    ajout    /////////////////////////////////////////////////////////
router.post("/add", auth, async (req, res) => {
  const commande = new Commande(req.body);
  try {
    const fou = await Client.findOne({ clientID: req.body.clientID });
    if (!fou) {
      return res.status(400).json("Client pas trouvé");
    }

    const newCommande = await commande.save();
    await traiterCommande(newCommande);
    res.status(201).json(newCommande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////////////////    update     /////////////////////////////////////////////////////////
router.patch("/update/:id", auth, getCommandeById, async (req, res) => {
  if (req.body.totalPrice != null) {
    res.commandes.totalPrice = req.body.totalPrice;
  }
  if (req.body.date != null) {
    res.commandes.date = req.body.date;
  }
  if (req.body.status != null) {
    res.commandes.status = req.body.status;
  }

  try {
    await res.commandes.save();
    res.json({ message: "Commande est modifier" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////////////////    delete    /////////////////////////////////////////////////////////

router.delete("/delete/:id", auth, getCommandeById, async (req, res) => {
  const commandes = res.commandes;
  if (commandes == null) {
    res.json({ message: "Commande est not found" });
  } else {
    try {
      await Commande.deleteOne(commandes);
      res.json({ message: "Commande est supprimé" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;
