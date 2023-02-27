const bcrypt = require("bcrypt");
const User = require("../models/user/User");
const Client = require("../models/user/Client");
const Employee = require("../models/user/Employee");
const Manager = require("../models/user/Manager");
const Admin = require("../models/user/Admin");
const { creerNouveauCompte } = require("../models/comptable/Compte");
const Comptable = require("../models/user/Comptable");
//const {creerNouveauCompte} = require("./create");

saisir = function () {
  async function saisirInfosContact() {
    const email = prompt("Veuillez saisir votre adresse email :");
    const tel = prompt("Veuillez saisir votre numéro de téléphone :");
    const nom = prompt("Veuillez saisir votre numéro de nom :");
    return { email, tel, nom };
  }
};

// exports.creerNouveauClient = async function(req) {
// //    const client= await static.createuser(req);
// //    return client;
// // };

// // exports.creerNouveauFournisseur = async function(req) {
// //    const fournisseur = new Fournisseur(req)
// //     try{
// //       await fournisseur.save();
// //       res.json(fournisseur);}
// //       catch(e){
// //         res.status(500).json({message: e.message});}

// // };

// async function creerNouveauCompte( compteID,nom_compte, type_compte) {
//   try {
//     const nouveauCompte = new Compte({
//       compteID: compteID,
//       nom_compte: nom_compte,
//       type: type_compte,
//     });
//     await nouveauCompte.save();
//     return nouveauCompte;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }}

const jwt = require("jsonwebtoken");

createuser = async function (req, res, next) {
  const newUser = new User(req.body);

  try {
    const isExisted = await User.findOne({ email: newUser.email });
    const existingname = await User.findOne({ username: newUser.username });
    if (isExisted) {
      return res.status(400).send({message:"email already registered"});
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
                      nom_contact_principal : user.firstName + ' ' + user.lastName,
                      // add other client properties here
                    });
                    const client = await newClients.save();
                    ress = { token: token } + client;
                    // (nomm = user.firstName + user.lastName),
                      await creerNouveauCompte(newClients.clientID, nomm, "Client");
                  } else if (user.userType === "Employee") {
                    const newEmployee = new Employee({
                      userID: user._id,
                    });
                    const employee = await newEmployee.save();
                    ress = { token: token } + employee;
                    nomm = user.firstName + user.lastName,
                    
                    await creerNouveauCompte(newClients.clientID, nomm, "Client");
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

                  res.status(200).json({token:token})
    }
  } catch (error) {
    res.status(400).send(error)
    next(error);
  }
};

module.exports = createuser;
