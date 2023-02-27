const express = require("express");
const router = express.Router();
const Manager = require("../../models/user/Manager");

////////////////////////////////////   get all
router.get("/", async (req, res) => {
  try {
    const managers = await Manager.find();
    res.json(managers);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   get by id
router.get("/:id", async (req, res) => {
  try {
    const manager = await Manager.findById(req.params.id);
    res.json(manager);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
////////////////////////////////////  add
router.post("/add", async (req, res) => {
  const manager = new Manager(req.body);
  try {
    await manager.save();
    res.json(manager);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   update
router.put("/update/:id", async (req, res) => {
  try {
    const manager = await Manager.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(manager);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const manager = await Manager.findByIdAndDelete(req.params.id);
    res.json(manager);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
