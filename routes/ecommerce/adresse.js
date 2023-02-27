const express = require("express");
const router = express.Router();
const Adresse = require("../../models/ecommerce/Adresse");

////////////////////////////////////   get all
router.get("/", async (req, res) => {
  try {
    const adresses = await Adresse.find();
    res.json(adresses);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   get by id
router.get("/:id", async (req, res) => {
  try {
    const adresse = await Adresse.findById(req.params.id);
    res.json(adresse);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
////////////////////////////////////  add
router.post("/add", async (req, res) => {
  const adresse = new Adresse(req.body);
  try {
    await adresse.save();
    res.json(adresse);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   update
router.put("/update/:id", async (req, res) => {
  try {
    const adresse = await Adresse.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(adresse);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const adresse = await Adresse.findByIdAndDelete(req.params.id);
    res.json(adresse);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
