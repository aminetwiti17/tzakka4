const express = require("express");
const router = express.Router();
const Employee = require("../../models/user/Employee");

////////////////////////////////////   get all
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   get by id
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
////////////////////////////////////  add
router.post("/add", async (req, res) => {
  const employee = new Employee(req.body);
  try {
    await employee.save();
    res.json(employee);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   update
router.put("/update/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(employee);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

////////////////////////////////////   delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    res.json(employee);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
