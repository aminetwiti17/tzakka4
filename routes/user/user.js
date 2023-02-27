const express = require("express");
const router = express.Router();
const User = require("../../models/user/User");
const Client = require("../../models/user/Client");

const auth = require("../../middleware/auth");
const createuser = require("../../middleware/createuser");

const bcrypt = require("bcrypt");

///////////////////    get all user     /////////////////////////////////////////////////////////

router.get("/", auth, async (req, res) => {
  try {
    const Users = await User.find();
    res.json(Users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/////////////////////////////////////////  function getUserById  /////////////////////////////////////////

async function getUserById(req, res, next) {
  console.log(req.params)
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find User" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.users = user;
  next();
}

///////////////////    get by id    /////////////////////////////////////////////////////////

router.get("/:id", async (req, res) => {
  console.log(req.params)
  try {
    user = await User.findOne({_id:req.params.id});
    console.log(user);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find User" });
    }
    
    return res.status(200).json(user);
  
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  
});

/////////////////////     ajout     /////////////////////////////////////////////////////////
router.post("/add", async (req, res, next) => {
  try {
    await createuser(req, res, next);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
});

///////////////////    update     /////////////////////////////////////////////////////////
router.patch("/update/:id", getUserById, auth, async (req, res) => {
  const users = new Avance(req.body);

  if (req.body.password != null) {
    res.users.password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    users.password = await bcrypt.hash(res.users.password, salt);
  }

  try {
    await users.save();
    res.json({ message: "User est modifier" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////////////////    delete    /////////////////////////////////////////////////////////

router.delete("/delete/:id", getUserById, auth, async (req, res) => {
  const users = res.users;
  if (users == null) {
    res.json({ message: "User est not found" });
  } else {
    try {
      await User.deleteOne(users);
      res.json({ message: "User est supprimé" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;
