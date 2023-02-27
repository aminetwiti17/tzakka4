const express = require("express");
const router = express.Router();
const FactureFournisseur = require("../../models/manager/FactureFournisseur");

////////////////////////////////////   get all
router.get("/", async (req, res) => {
  try {
    const factureFournisseurs = await FactureFournisseur.find();
    res.json(factureFournisseurs);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   get by id
router.get("/:id", async (req, res) => {
  try {
    const factureFournisseur = await FactureFournisseur.findById(req.params.id);
    res.json(factureFournisseur);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
////////////////////////////////////  add
router.post("/add", async (req, res) => {
  const factureFournisseur = new FactureFournisseur(req.body);
  try {
    await factureFournisseur.save();
    res.json(factureFournisseur);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   update
router.put("/update/:id", async (req, res) => {
  try {
    const factureFournisseur = await FactureFournisseur.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(factureFournisseur);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const factureFournisseur = await FactureFournisseur.findByIdAndDelete(
      req.params.id
    );
    res.json(factureFournisseur);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
