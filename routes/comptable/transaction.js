const express = require("express");
const router = express.Router();
const Transaction = require("../../models/comptable/Transaction");
const auth = require("../../middleware/auth");

////////////////////////////////////   get all
router.get("/", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   get by id
router.get("/:id", auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    res.json(transaction);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
////////////////////////////////////  add
router.post("/add", auth, async (req, res) => {
  const transaction = new Transaction(req.body);
  try {
    await transaction.save();
    res.json(transaction);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   update
router.put("/update/:id", auth, async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(transaction);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   delete
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    res.json(transaction);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
