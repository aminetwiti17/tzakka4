const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const createuser = require("../../middleware/createuser");
const bcrypt = require("bcrypt");
//const User = require("../User");
const Client = require("./Client");
const Employee = require("./Employee");
const Manager = require("./Manager");
const Admin = require("./Admin");
const Compte = require("../comptable/Compte");
const Comptable = require("./Comptable");

const User = new Schema({
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    default: "Client",
    enum: ["Employee", "Admin", "Client", "Manager", "Comptable"],
    required: true,
  },

  /////complementaire
  firstName: { type: String },
  lastName: {
    type: String,
  },
  
  tel: {
    type: String,
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
});

const Users = mongoose.model("User", User);
/// ajout (client et son compte)ou manager ou admin ou (employer et son compte) lors de enregistrement un user
const jwt = require("jsonwebtoken");

User.createuser = async function (req, res, next) {
  const newUser = new User(req.body);

  try {
    const isExisted = await User.findOne({ email: newUser.email });
    const existingname = await User.findOne({ username: newUser.username });
    if (isExisted) {
      return res.status(400).send("email already registered");
    } else if (existingname) {
      return res.status(400).send({ message: "username déjà enregistré" });
    } else {
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      const user = await newUser.save();
      const token = jwt.sign(
        {
          _id: user._id,
          username: user.username,
          email: user.email,
          userType: user.userType,
        },
        process.env.SECRET_KEY
      );
      if (user.userType === "Client") {
        const newClients = new Client({
          userID: user._id,
          // add other client properties here
        });
        const client = await newClients.save();
        ress = { token: token } + client;
        (nomm = user.firstName + user.lastName),
          (ress =
            ress +
            (await creerNouveauCompte(newClients.clientID, nomm, "Client")));
      } else if (user.userType === "Employee") {
        const newEmployee = new Employee({
          userID: user._id,
        });
        const employee = await newEmployee.save();
        ress = { token: token } + employee;
        (nomm = user.firstName + user.lastName),
          (ress =
            ress +
            (await static.creerNouveauCompte(
              newClients.clientID,
              nomm,
              "Client"
            )));
      }
      if (user.userType === "Manager") {
        const newManagers = new Manager({
          userID: user._id,
        });
        const manager = await newManagers.save();
        ress = { token: token } + manager;
      }
      if (user.userType === "Comptable") {
        const newComptable = new Comptable({
          userID: user._id,
          // add other Comptable properties here
        });
        const comptable = await newComptable.save();
        ress = { token: token } + comptable;
      }
      if (user.userType === "Admin") {
        const newAdmins = new Admin({
          userID: user._id,
          // add other client properties here
        });
        const admin = await newAdmins.save();
        ress = { token: token } + admin;
      }

      return res.status(201).send(ress);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = Users;
