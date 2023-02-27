const express = require("express");
const router = express.Router();
const Lignedecommande = require("../../models/ecommerce/Lignecommande");
const Product = require("../../models/ecommerce/Product");

////////////////////////////////////   get all
router.get("/", async (req, res) => {
  try {
    const lignedecommandes = await Lignedecommande.find();
    res.json(lignedecommandes);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   get by id
router.get("/:id", async (req, res) => {
  try {
    const lignedecommande = await Lignedecommande.findById(req.params.id);
    res.json(lignedecommande);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
////////////////////////////////////  add
router.post("/add", async (req, res) => {
  try {
    const product = await Product.findOne({ productID: req.body.productID });
    if (!product) throw new Error("produit pas trouver");
    x = product.price;

    const newLigneCommande = new Lignedecommande({
      productID: req.body.productID,
      quantite: req.body.quantite,
      prixunite: x,
      prixtotal: req.body.quantite * x,
    });
    await newLigneCommande.save();

    res.status(201).json(newLigneCommande);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   update
router.put("/update/:id", async (req, res) => {
  try {
    const lignedecommande = await Lignedecommande.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(lignedecommande);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const lignedecommande = await Lignedecommande.findByIdAndDelete(
      req.params.id
    );
    res.json(lignedecommande);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
