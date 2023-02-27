const express = require("express");
const router = express.Router();
const Comptable = require("../../models/user/Comptable");

////////////////////////////////////   get all
router.get("/", async (req, res) => {
  try {
    const comptables = await Comptable.find();
    res.json(comptables);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   get by id
router.get("/:id", async (req, res) => {
  try {
    const comptable = await Comptable.findById(req.params.id);
    res.json(comptable);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
////////////////////////////////////  add
router.post("/add", async (req, res) => {
  const comptable = new Comptable(req.body);
  try {
    await comptable.save();
    res.json(comptable);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   update
router.put("/update/:id", async (req, res) => {
  try {
    const comptable = await Comptable.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(comptable);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const comptable = await Comptable.findByIdAndDelete(req.params.id);
    res.json(comptable);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
