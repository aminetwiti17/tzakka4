const express = require("express");
const router = express.Router();
const Service = require("../../models/ecommerce/Service");
const auth = require("../../middleware/auth");

///////////////////    get     /////////////////////////////////////////////////////////

router.get("/", async (req, res) => {
  try {
    const Services = await Service.find();
    res.json(Services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getServiceById(req, res, next) {
  try {
    service = await Service.findById(req.params.id);
    if (service == null) {
      return res.status(404).json({ message: "Cannot find Service" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.services = service;
  next();
}

///////////////////    get by id    /////////////////////////////////////////////////////////

router.get("/:id", getServiceById, (req, res) => {
  res.json(res.services);
});

// ajout
router.post("/add", auth, async (req, res) => {
  const service = new Service({
    description: req.body.description,
    image: req.body.image,
    name: req.body.name,
    prix: req.body.prix,
  });
  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////////////////    update     /////////////////////////////////////////////////////////
router.patch("/update/:id", getServiceById, auth, async (req, res) => {
  if (req.body.description != null) {
    res.services.description = req.body.description;
  }
  if (req.body.image != null) {
    res.services.image = req.body.image;
  }
  if (req.body.name != null) {
    res.services.name = req.body.name;
  }
  if (req.body.prix != null) {
    res.services.prix = req.body.prix;
  }

  try {
    await res.services.save();
    res.json({ message: "Service est modifier" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////////////////    delete    /////////////////////////////////////////////////////////

router.delete("/delete/:id", getServiceById, auth, async (req, res) => {
  const services = res.services;
  if (services == null) {
    res.json({ message: "Service est not found" });
  } else {
    try {
      await Service.deleteOne(services);
      res.json({ message: "Service est supprimé" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;
