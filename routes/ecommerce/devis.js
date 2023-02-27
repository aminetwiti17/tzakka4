const express = require("express");
const router = express.Router();
const Devis = require("../../models/ecommerce/Devis");
const auth = require("../../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const Deviss = await Devis.find();
    res.json(Deviss);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getDevisById(req, res, next) {
  try {
    devis = await Devis.findById(req.params.id);
    if (devis == null) {
      return res.status(404).json({ message: "Cannot find Devis" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.deviss = devis;
  next();
}

///////////////////    get by id    /////////////////////////////////////////////////////////

router.get("/:id", getDevisById, (req, res) => {
  res.json(res.deviss);
});

// ajout
router.post("/add", auth, async (req, res) => {
  const devis = new Devis({});
  try {
    const newDevis = await devis.save();
    res.status(201).json(newDevis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////////////////    update     /////////////////////////////////////////////////////////
router.patch("/update/:id", getDevisById, auth, async (req, res) => {
  try {
    await res.deviss.save();
    res.json({ message: "Devis est modifier" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////////////////    delete    /////////////////////////////////////////////////////////

router.delete("/delete/:id", getDevisById, auth, async (req, res) => {
  const deviss = res.deviss;
  if (deviss == null) {
    res.json({ message: "Devis est not found" });
  } else {
    try {
      await Devis.deleteOne(deviss);
      res.json({ message: "Devis est supprimé" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;
