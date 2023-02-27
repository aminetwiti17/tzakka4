const express = require("express");
const router = express.Router();
const Fournisseur = require("../../models/manager/Fournisseur");

////////////////////////////////////   get all
router.get("/", async (req, res) => {
  try {
    const fournisseurs = await Fournisseur.find();
    res.json(fournisseurs);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   get by id
router.get("/:id", async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findById(req.params.id);
    res.json(fournisseur);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
////////////////////////////////////  add

router.post("/add", async (req, res) => {
  const fournisseur = new Fournisseur(req.body);
  try {
    await fournisseur.save();
    res.json(fournisseur);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   update
router.put("/update/:id", async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(fournisseur);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findByIdAndDelete(req.params.id);
    res.json(fournisseur);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
