const express = require("express");
const router = express.Router();
const Avance = require("../../models/comptable/Avance");
const auth = require("../../middleware/auth");

////////////////////////////////////   get all
router.get("/", auth, async (req, res) => {
  try {
    const avances = await Avance.find();
    res.json(avances);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   get by id
router.get("/:id", auth, async (req, res) => {
  try {
    const avance = await Avance.findById(req.params.id);
    res.json(avance);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
////////////////////////////////////  add
router.post("/add", auth, async (req, res) => {
  const avance = new Avance(req.body);
  try {
    await avance.save();
    res.json(avance);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   update
router.put("/update/:id", auth, async (req, res) => {
  try {
    const avance = await Avance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(avance);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   delete
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const avance = await Avance.findByIdAndDelete(req.params.id);
    res.json(avance);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
