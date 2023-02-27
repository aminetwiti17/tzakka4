// async function createClient(user) {
//     // Créer un nouveau client
//     const client = new Client({
//       nom: user.nom, // Utiliser les informations de l'utilisateur pour créer le client
//       prenom: user.prenom,
//       email: user.email
//     });

//     // Enregistrer le client dans la base de données
//     await client.save();

//     // Mettre à jour l'utilisateur pour référencer le client
//     user.type = 'client'; // Mettre à jour le type de l'utilisateur
//     user.client = client._id; // Référencer le client créé dans l'utilisateur
//     await user.save();
//   }
const User = require("../models/user/User");
const Client = require("../models/user/Client");
const Employee = require("../models/user/Employee");
const Manager = require("../models/user/Manager");
const Admin = require("../models/user/Admin");
const Compte = require("../models/comptable/Compte");
const Comptable = require("../models/user/Comptable");
const Fournisseur = require("../models/user/Fournisseur");

// exports.saisir = function() {
//   async function saisirInfosContact() {
//       const email = prompt("Veuillez saisir votre adresse email :");
//       const tel = prompt("Veuillez saisir votre numéro de téléphone :");
//       const nom = prompt("Veuillez saisir votre numéro de nom :");
//       return { email, tel ,nom };
//     }

// exports.creerNouveauClient = async function(req) {
//    const client= await static.createuser(req);
//    return client;
// };

// exports.creerNouveauFournisseur = async function(req) {
//    const fournisseur = new Fournisseur(req);

// };

// module.exports =creerNouveauCompte;
