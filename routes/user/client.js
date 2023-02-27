const express = require("express");
const router = express.Router();
const Client = require("../../models/user/Client");

////////////////////////////////////   get all
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   get by id
router.get("/:id", async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    res.json(client);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
////////////////////////////////////  add
router.post("/add", async (req, res) => {
  const client = new Client(req.body);
  try {
    await client.save();
    res.json(client);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   update
router.put("/update/:id", async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(client);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    res.json(client);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
