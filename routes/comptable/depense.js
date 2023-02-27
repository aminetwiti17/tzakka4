const express = require("express");
const router = express.Router();
const Depense = require("../../models/comptable/Depense");
const auth = require("../../middleware/auth");

////////////////////////////////////   get all
router.get("/", auth, async (req, res) => {
  try {
    const depenses = await Depense.find();
    res.json(depenses);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   get by id
router.get("/:id", auth, async (req, res) => {
  try {
    const depense = await Depense.findById(req.params.id);
    res.json(depense);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
////////////////////////////////////  add
router.post("/add", auth, async (req, res) => {
  const depense = new Depense(req.body);
  try {
    await depense.save();
    res.json(depense);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   update
router.put("/update/:id", auth, async (req, res) => {
  try {
    const depense = await Depense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(depense);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   delete
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const depense = await Depense.findByIdAndDelete(req.params.id);
    res.json(depense);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
