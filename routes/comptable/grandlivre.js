const express = require("express");
const router = express.Router();
const Grandlivre = require("../../models/comptable/Grandlivre");
const auth = require("../../middleware/auth");

////////////////////////////////////   get all
router.get("/", auth, async (req, res) => {
  try {
    const grandlivres = await Grandlivre.find();
    res.json(grandlivres);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   get by id
router.get("/:id", auth, async (req, res) => {
  try {
    const grandlivre = await Grandlivre.findById(req.params.id);
    res.json(grandlivre);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
////////////////////////////////////  add
router.post("/add", auth, async (req, res) => {
  const grandlivre = new Grandlivre(req.body);
  try {
    await grandlivre.save();
    res.json(grandlivre);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   update
router.put("/update/:id", auth, async (req, res) => {
  try {
    const grandlivre = await Grandlivre.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(grandlivre);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   delete
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const grandlivre = await Grandlivre.findByIdAndDelete(req.params.id);
    res.json(grandlivre);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
