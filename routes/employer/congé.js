const express = require("express");
const router = express.Router();
const Congé = require("../../models/employer/Congé");
const auth = require("../../middleware/auth");

///////////////////    get     /////////////////////////////////////////////////////////

router.get("/", auth, async (req, res) => {
  try {
    const Congés = await Congé.find();
    res.json(Congés);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCongéById(req, res, next) {
  try {
    congé = await Congé.findById(req.params.id);
    if (congé == null) {
      return res.status(404).json({ message: "Cannot find Congé" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.congés = congé;
  next();
}

///////////////////    get by id    /////////////////////////////////////////////////////////

router.get("/:id", getCongéById, auth, (req, res) => {
  res.json(res.congés);
});
///////////////////    get by employeeid   /////////////////////////////////////////////////////////

router.get("/employee/:employeeID", getCongéByemployeeid, auth, (req, res) => {
  res.json(res.congés);
});

async function getCongéByemployeeid(req, res, next) {
  try {
    congé = await Congé.findOne({ employeeID: req.params.employeeID });
    if (congé == null) {
      return res.status(404).json({ message: "Cannot find Congé" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.congés = congé;
  next();
}

///////////////////////////////////     ajout     /////////////////////////////////////////////////////////

router.post("/add", auth, async (req, res) => {
  const newCongé = new Congé({
    employeeID: req.body.employeeID,
    title: req.body.title,
    type: req.body.type,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    appliedDate: req.body.appliedDate,
    period: req.body.period,
    reason: req.body.reason,
    adminResponse: req.body.adminResponse,
  });

  try {
    const newCongés = await newCongé.save();
    res.status(201).json(newCongés);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

///////////////////    update     /////////////////////////////////////////////////////////
router.patch("/update/:id", getCongéByemployeeid, auth, async (req, res) => {
  if (req.body.title != null) {
    res.missions.title = req.body.title;
  }
  if (req.body.type != null) {
    res.missions.type = req.body.type;
  }
  if (req.body.startDate != null) {
    res.missions.startDate = req.body.startDate;
  }
  if (req.body.endDate != null) {
    res.missions.endDate = req.body.endDate;
  }
  if (req.body.appliedDate != null) {
    res.missions.appliedDate = req.body.appliedDate;
  }
  if (req.body.period != null) {
    res.missions.period = req.body.period;
  }
  if (req.body.reason != null) {
    res.missions.reason = req.body.reason;
  }
  if (req.body.adminResponse != null) {
    res.missions.adminResponse = req.body.adminResponse;
  }
  if (req.body.adminResponse != null) {
    res.missions.adminResponse = req.body.adminResponse;
  }
  try {
    await res.congés.save();
    res.json({ message: "Congé est modifier" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////////////////    delete    /////////////////////////////////////////////////////////

router.delete("/delete/:id", getCongéById, auth, async (req, res) => {
  const congés = res.congés;
  if (congés == null) {
    res.json({ message: "Congé est not found" });
  } else {
    try {
      await Congé.deleteOne(congés);
      res.json({ message: "Congé est supprimé" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;
