const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Categorie = require("../../models/ecommerce/Categorie");

///////////////////    get     /////////////////////////////////////////////////////////

router.get("/", async (req, res) => {
  try {
    const Categories = await Categorie.find();
    res.json(Categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCategorieById(req, res, next) {
  try {
    categorie = await Categorie.findById(req.params.id);
    if (categorie == null) {
      return res.status(404).json({ message: "Cannot find Categorie" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.categories = categorie;
  next();
}

///////////////////    get by id    /////////////////////////////////////////////////////////

router.get("/:id", getCategorieById, (req, res) => {
  res.json(res.categories);
});

///////////////////    get by produitid   /////////////////////////////////////////////////////////

async function getProductByproductID(req, res, next) {
  try {
    Product = await Product.findOne({ productID: req.params.productID });
    if (Product == null) {
      return res.status(404).json({ message: "Cannot find Product" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.Products = Product;
  next();
}
router.get("/product/:productID", getProductByproductID, (req, res) => {
  res.json(res.Products);
});

/////////////////////    ajout    /////////////////////////////////////////////////////////
router.post("/add", auth, async (req, res) => {
  const categorie = new Categorie({
    descriptionC: req.body.descriptionC,
    typeC: req.body.typeC,
    name: req.body.name,
  });
  try {
    const newCategorie = await categorie.save();
    res.status(201).json(newCategorie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////////////////    update     /////////////////////////////////////////////////////////
router.patch("/update/:id", getCategorieById, auth, async (req, res) => {
  if (req.body.descriptionC != null) {
    res.categories.descriptionC = req.body.descriptionC;
  }
  if (req.body.typeC != null) {
    res.categories.typeC = req.body.typeC;
  }
  if (req.body.name != null) {
    res.categories.name = req.body.name;
  }

  try {
    await res.categories.save();
    res.json({ message: "Categorie est modifier" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////////////////    delete    /////////////////////////////////////////////////////////

router.delete("/delete/:id", getCategorieById, auth, async (req, res) => {
  const categories = res.categories;
  if (categories == null) {
    res.json({ message: "Categorie est not found" });
  } else {
    try {
      await Categorie.deleteOne(categories);
      res.json({ message: "Categorie est supprimé" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;
