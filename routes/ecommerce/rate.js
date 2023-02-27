const express = require("express");
const router = express.Router();
const Rate = require("../../models/ecommerce/Rate");
const User = require("../../models/user/User");
const Product = require("../../models/ecommerce/Product");
const Service = require("../../models/ecommerce/Service");
const auth = require("../../middleware/auth");

///////////////////    get     /////////////////////////////////////////////////////////

router.get("/", async (req, res) => {
  try {
    const Rates = await Rate.find();
    res.json(Rates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getRateById(req, res, next) {
  try {
    rate = await Rate.findById(req.params.id);
    if (rate == null) {
      return res.status(404).json({ message: "Cannot find Rate" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.rates = rate;
  next();
}

///////////////////    get by id    /////////////////////////////////////////////////////////

router.get("/:id", getRateById, (req, res) => {
  res.json(res.rates);
});

/////////////////////    ajout    /////////////////////////////////////////////////////////
router.post("/add", auth, async (req, res) => {
  const rate = new Rate({
    rate: req.body.rate,
    commentaire: req.body.commentaire,
  });
  try {
    const newRate = await rate.save();
    res.status(201).json(newRate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////////////////    update     /////////////////////////////////////////////////////////
router.patch("/update/:id", getRateById, auth, async (req, res) => {
  if (req.body.rate != null) {
    res.rates.rate = req.body.rate;
  }
  if (req.body.commentaire != null) {
    res.rates.commentaire = req.body.commentaire;
  }

  try {
    await res.rates.save();
    res.json({ message: "Rate est modifier" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////////////////    delete    /////////////////////////////////////////////////////////

router.delete("/delete/:id", getRateById, auth, async (req, res) => {
  const rates = res.rates;
  if (rates == null) {
    res.json({ message: "Rate est not found" });
  } else {
    try {
      await Rate.deleteOne(rates);
      res.json({ message: "Rate est supprimé" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});
// get rate by produit
router.get("/getRateByProduct/:idProduit", (req, res) => {
  Product.find({ rate: req.params.Product._id })
    .then((rates) => res.json(rates))
    .catch((error) => res.status(400).json({ error: error.message }));
});
// get rate by service
router.get("/getRateService/:idService", (req, res) => {
  Service.find({ service: req.params.Service._id })
    .then((rates) => res.json(rates))
    .catch((error) => res.status(400).json({ error: error.message }));
});
// get rates by user
router.get("/getRateByUser/:iduser", auth, (req, res) => {
  User.find({ user: req.params.user._id })
    .then((rates) => res.json(rates))
    .catch((error) => res.status(400).json({ error: error.message }));
});

module.exports = router;
