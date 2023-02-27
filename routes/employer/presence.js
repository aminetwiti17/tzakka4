const express = require("express");
const router = express.Router();
const Presence = require("../../models/employer/Presence");
const auth = require("../../middleware/auth");

const User = require("../../models/user/User");

///////////////////    get     /////////////////////////////////////////////////////////

router.get("/", auth, async (req, res) => {
  try {
    const Presences = await Presence.find();
    res.json(Presences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

///////////////////    get by employeeid   /////////////////////////////////////////////////////////

router.get(
  "/employee/:employeeID",
  getPresenceByemployeeid,
  auth,
  (req, res) => {
    res.json(res.presences);
  }
);

async function getPresenceByemployeeid(req, res, next) {
  try {
    presence = await Presence.findOne({ employeeID: req.params.employeeID });
    if (presence == null) {
      return res.status(404).json({ message: "Cannot find Presence" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.presences = presence;
  next();
}
/////////////////////////////////////////////////////////////////
async function getPresenceBydate(req, res, next) {
  try {
    presence = await Presence.findOne({ date: req.params.date });
    if (presence == null) {
      return res.status(404).json({ message: "Cannot find Presence" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.presences = presence;
  next();
}
//////////////////////////////////////////// get presence employee par periode
async function getpresentday(employeeID, periodStart, periodEnd) {
  try {
    const presenceDocs = await Presence.find({
      employeeID: employeeID,
      date: { $gte: periodStart, $lte: periodEnd },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.presenceDoc = presenceDocs;
  next();
}

async function getPresenceById(req, res, next) {
  try {
    presence = await Presence.findById(req.params.id);
    if (presence == null) {
      return res.status(404).json({ message: "Cannot find Presence" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.presences = presence;
  next();
}

///////////////////    get by id    /////////////////////////////////////////////////////////

router.get("/:id", getPresenceById, auth, (req, res) => {
  res.json(res.presences);
});
router.get("/date/:date", getPresenceBydate, auth, (req, res) => {
  res.json(res.presences);
});
router.get(
  "/employee/:employeeID",
  getPresenceByemployeeid,
  auth,
  (req, res) => {
    res.json(res.presences);
  }
);
router.get("/periode", getpresentday, auth, (req, res) => {
  res.json(res.presences);
});

/////////////////////    ajout    /////////////////////////////////////////////////////////
router.post("/add", auth, async (req, res) => {
  const presence = new Presence({
    employeeID: req.body.employeeID,
    date: req.body.date,
    present: req.body.present,
  });
  try {
    const newPresence = await presence.save();
    res.status(201).json(newPresence);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////////////////    update     /////////////////////////////////////////////////////////
router.patch("/update/:id", getPresenceById, auth, async (req, res) => {
  if (req.body.date != null) {
    res.presences.date = req.body.date;
  }
  if (req.body.present != null) {
    res.presences.present = req.body.present;
  }

  try {
    await res.presences.save();
    res.json({ message: "Presence est modifier" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////////////////    delete    /////////////////////////////////////////////////////////

router.delete("/delete/:id", getPresenceById, auth, async (req, res) => {
  const presences = res.presences;
  if (presences == null) {
    res.json({ message: "Presence est not found" });
  } else {
    try {
      await Presence.deleteOne(presences);
      res.json({ message: "Presence est supprimé" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;
