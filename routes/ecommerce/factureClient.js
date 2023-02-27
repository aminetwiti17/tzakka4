const express = require("express");
const router = express.Router();
const FactureClient = require("../../models/ecommerce/FactureClient");

////////////////////////////////////   get all
router.get("/", async (req, res) => {
  try {
    const factureClients = await FactureClient.find();
    res.json(factureClients);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   get by id
router.get("/:id", async (req, res) => {
  try {
    const factureClient = await FactureClient.findById(req.params.id);
    res.json(factureClient);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
////////////////////////////////////  add
router.post("/add", async (req, res) => {
  const factureClient = new FactureClient(req.body);
  try {
    await factureClient.save();
    res.json(factureClient);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   update
router.put("/update/:id", async (req, res) => {
  try {
    const factureClient = await FactureClient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(factureClient);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const factureClient = await FactureClient.findByIdAndDelete(req.params.id);
    res.json(factureClient);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
