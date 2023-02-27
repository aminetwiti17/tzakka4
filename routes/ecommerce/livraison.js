const express = require("express");
const router = express.Router();
const Livraison = require("../../models/ecommerce/Livraison");
const auth = require("../../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const Livraisons = await Livraison.find();
    res.json(Livraisons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getLivraisonById(req, res, next) {
  try {
    livraisonss = await Livraison.findById(req.params.id);
    if (livraisonss == null) {
      return res.status(404).json({ message: "Cannot find Livraison" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.livraisons = livraisonss;
  next();
}

///////////////////    get by id    /////////////////////////////////////////////////////////

router.get("/:id", getLivraisonById, auth, (req, res) => {
  res.json(res.livraisons);
});

// ajout
router.post("/add", async (req, res) => {
  const livraisons = new Livraison({
    address: req.body.address,
    date: req.body.date,
    status: req.body.status,
  });
  try {
    const newLivraison = await livraisons.save();
    res.status(201).json(newLivraison);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////////////////    update     /////////////////////////////////////////////////////////
router.patch("/update/:id", getLivraisonById, auth, async (req, res) => {
  if (req.body.address != null) {
    res.livraisons.address = req.body.address;
  }
  if (req.body.date != null) {
    res.livraisons.date = req.body.date;
  }
  if (req.body.status != null) {
    res.livraisons.status = req.body.status;
  }

  try {
    await res.livraisons.save();
    res.json({ message: "Livraison est modifier" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////////////////    delete    /////////////////////////////////////////////////////////

router.delete("/delete/:id", getLivraisonById, auth, async (req, res) => {
  const livraisons = res.livraisons;
  if (livraisons == null) {
    res.json({ message: "Livraison est not found" });
  } else {
    try {
      await Livraison.deleteOne(livraisons);
      res.json({ message: "Livraison est supprimé" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;
