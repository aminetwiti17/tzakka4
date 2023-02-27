const express = require("express");
const router = express.Router();
const {CommandeFournisseur,traiterCommande} = require("../../models/manager/CommandeFournisseur");
const Fournisseur = require("../../models/manager/Fournisseur");
////////////////////////////////////   get all
router.get("/", async (req, res) => {
  try {
    const commandeFournisseurs = await CommandeFournisseur.find();
    res.json(commandeFournisseurs);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   get by id
router.get("/:id", async (req, res) => {
  try {
    const commandeFournisseur = await CommandeFournisseur.findById(
      req.params.id
    );
    res.json(commandeFournisseur);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
////////////////////////////////////  add
router.post("/add", async (req, res) => {
  const commandeFournisseur = new CommandeFournisseur(req.body);
  try {
    const fou = await Fournisseur.findOne({
      fournisseurID: req.body.fournisseurID,
    });
    if (!fou) {
      return res.status(400).json("fournisseur pas trouvé");
    }
    commande =await commandeFournisseur.save();
    await traiterCommande(commande);
    res.json(commandeFournisseur);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   update
router.put("/update/:id", async (req, res) => {
  try {
    const commandeFournisseur = await CommandeFournisseur.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(commandeFournisseur);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const commandeFournisseur = await CommandeFournisseur.findByIdAndDelete(
      req.params.id
    );
    res.json(commandeFournisseur);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
