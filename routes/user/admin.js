const express = require("express");
const router = express.Router();
const Admin = require("../../models/user/Admin");

////////////////////////////////////   get all
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   get by id
router.get("/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    res.json(admin);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
////////////////////////////////////  add
router.post("/add", async (req, res) => {
  const admin = new Admin(req.body);
  try {
    await admin.save();
    res.json(admin);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   update
router.put("/update/:id", async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(admin);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    res.json(admin);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
