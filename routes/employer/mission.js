const express = require("express");
const router = express.Router();
const Mission = require("../../models/employer/Mission");
const auth = require("../../middleware/auth");

///////////////////    get     /////////////////////////////////////////////////////////

router.get("/", auth, async (req, res) => {
  try {
    const Missions = await Mission.find();
    res.json(Missions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getMissionById(req, res, next) {
  try {
    mission = await Mission.findById(req.params.id);
    if (mission == null) {
      return res.status(404).json({ message: "Cannot find Mission" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.missions = mission;
  next();
}
///////////////////    get by employeeid   /////////////////////////////////////////////////////////

router.get(
  "/employee/:employeeID",
  getMissionByemployeeid,
  auth,
  (req, res) => {
    res.json(res.missions);
  }
);

async function getMissionByemployeeid(req, res, next) {
  try {
    mission = await Mission.findOne({ employeeID: req.params.employeeID });
    if (mission == null) {
      return res.status(404).json({ message: "Cannot find Mission" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.missions = mission;
  next();
}

///////////////////    get by id    /////////////////////////////////////////////////////////

router.get("/:id", getMissionById, auth, (req, res) => {
  res.json(res.missions);
});

///////////////////////////////////     ajout     /////////////////////////////////////////////////////////

router.post("/add", auth, async (req, res) => {
  const newMission = new Mission({
    employeeID: req.body.employeeID,
    title: req.body.title,
    type: req.body.type,
    statuS: req.body.statuS,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

  try {
    const newMissions = await newMission.save();
    res.status(201).json(newMissions);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

///////////////////    update     /////////////////////////////////////////////////////////
router.patch("/update/:id", getMissionById, auth, async (req, res) => {
  if (req.body.title != null) {
    res.missions.title = req.body.title;
  }
  if (req.body.type != null) {
    res.missions.type = req.body.type;
  }
  if (req.body.statuS != null) {
    res.missions.statuS = req.body.statuS;
  }
  if (req.body.description != null) {
    res.missions.description = req.body.description;
  }
  if (req.body.startDate != null) {
    res.missions.startDate = req.body.startDate;
  }
  if (req.body.endDate != null) {
    res.missions.endDate = req.body.endDate;
  }
  try {
    await res.missions.save();
    res.json({ message: "Mission est modifier" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////////////////    delete    /////////////////////////////////////////////////////////

router.delete("/delete/:id", getMissionById, auth, async (req, res) => {
  const missions = res.missions;
  if (missions == null) {
    res.json({ message: "Mission est not found" });
  } else {
    try {
      await Mission.deleteOne(missions);
      res.json({ message: "Mission est supprimé" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;
