const express = require("express");
const router = express.Router();
const Product = require("../../models/ecommerce/Product");
const auth = require("../../middleware/auth");

///////////////////    get     /////////////////////////////////////////////////////////

router.get("/", async (req, res) => {
  try {
    const Products = await Product.find();
    res.json(Products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getProductById(req, res, next) {
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Cannot find Product" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.products = product;
  next();
}

///////////////////    get by id    /////////////////////////////////////////////////////////

router.get("/:id", getProductById, (req, res) => {
  res.json(res.products);
});
///////////////////    get produit by categorieid   /////////////////////////////////////////////////////////

async function getproductcategorieID(req, res, next) {
  try {
    categorie = await Categorie.find({ categorieID: req.params.categorieID });
    if (categorie == null) {
      return res.status(404).json({ message: "Cannot find Categorie" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.categories = categorie;
  next();
}
router.get("/categorie/:categorieID", getproductcategorieID, (req, res) => {
  res.json(res.categories);
});

// ajout
router.post("/add", auth, async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////////////////    update     /////////////////////////////////////////////////////////
router.patch("/update/:id", getProductById, auth, async (req, res) => {
  if (req.body.name != null) {
    res.products.name = req.body.name;
  }
  if (req.body.description != null) {
    res.products.description = req.body.description;
  }
  if (req.body.image != null) {
    res.products.image = req.body.image;
  }
  if (req.body.price != null) {
    res.products.price = req.body.price;
  }
  if (req.body.quantity != null) {
    res.products.quantity = req.body.quantity;
  }
  try {
    await res.products.save();
    res.json({ message: "Product est modifier" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////////////////    delete    /////////////////////////////////////////////////////////

router.delete("/delete/:id", getProductById, auth, async (req, res) => {
  const products = res.products;
  if (products == null) {
    res.json({ message: "Product est not found" });
  } else {
    try {
      await Product.deleteOne(products);
      res.json({ message: "Product est supprimé" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;
