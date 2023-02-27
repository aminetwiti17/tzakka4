const express = require("express");
const router = express.Router();
const Reclamation = require("../../models/ecommerce/Reclamation");
const auth = require("../../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const Reclamations = await Reclamation.find();
    res.json(Reclamations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getReclamationById(req, res, next) {
  try {
    reclamationss = await Reclamation.findById(req.params.id);
    if (reclamationss == null) {
      return res.status(404).json({ message: "Cannot find Reclamation" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.reclamations = reclamationss;
  next();
}

///////////////////    get by id    /////////////////////////////////////////////////////////

router.get("/:id", getReclamationById, auth, (req, res) => {
  res.json(res.reclamations);
});

///////////////////     ajout    /////////////////////////////////////////////////////////
router.post("/add", auth, async (req, res) => {
  const reclamations = new Reclamation({
    descriptionR: req.body.descriptionR,
    typeR: req.body.typeR,
  });
  try {
    const newReclamation = await reclamations.save();
    res.status(201).json(newReclamation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////////////////    update     /////////////////////////////////////////////////////////
router.patch("/update/:id", getReclamationById, auth, async (req, res) => {
  if (req.body.descriptionR != null) {
    res.reclamations.descriptionR = req.body.descriptionR;
  }
  if (req.body.typeR != null) {
    res.reclamations.typeR = req.body.typeR;
  }

  try {
    await res.reclamations.save();
    res.json({ message: "Reclamation est modifier" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////////////////    delete    /////////////////////////////////////////////////////////

router.delete("/delete/:id", getReclamationById, auth, async (req, res) => {
  const reclamations = res.reclamations;
  if (reclamations == null) {
    res.json({ message: "Reclamation est not found" });
  } else {
    try {
      await Reclamation.deleteOne(reclamations);
      res.json({ message: "Reclamation est supprimé" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;
