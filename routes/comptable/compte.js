const express = require("express");
const router = express.Router();
const { Compte } = require("../../models/comptable/Compte");
const auth = require("../../middleware/auth");

////////////////////////////////////   get all
router.get("/", auth, async (req, res) => {
  try {
    const comptes = await Compte.find();
    res.json(comptes);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   get by id
router.get("/:id", auth, async (req, res) => {
  try {
    const compte = await Compte.findById(req.params.id);
    res.json(compte);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
////////////////////////////////////  add
router.post("/add", auth, async (req, res) => {
  const compte = new Compte(req.body);
  try {
    await compte.save();
    res.json(compte);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   update
router.put("/update/:id", auth, async (req, res) => {
  try {
    const compte = await Compte.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(compte);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   delete
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const compte = await Compte.findByIdAndDelete(req.params.id);
    res.json(compte);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
