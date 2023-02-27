const express = require("express");
const router = express.Router();
const Fichedepaie = require("../../models/comptable/Fichedepaie");
const auth = require("../../middleware/auth");

////////////////////////////////////   get all
router.get("/", auth, async (req, res) => {
  try {
    const fichedepaies = await Fichedepaie.find();
    res.json(fichedepaies);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   get by id
router.get("/:id", auth, async (req, res) => {
  try {
    const fichedepaie = await Fichedepaie.findById(req.params.id);
    res.json(fichedepaie);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
////////////////////////////////////  add
router.post("/add", auth, async (req, res) => {
  const fichedepaie = new Fichedepaie(req.body);
  try {
    await fichedepaie.save();
    res.json(fichedepaie);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   update
router.put("/update/:id", auth, async (req, res) => {
  try {
    const fichedepaie = await Fichedepaie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(fichedepaie);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   delete
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const fichedepaie = await Fichedepaie.findByIdAndDelete(req.params.id);
    res.json(fichedepaie);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
