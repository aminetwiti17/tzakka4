const express = require("express");
const app = express();


const commandeFournisseur = require("../routes/manager/commandeFournisseur");
const factureFounisseur = require("../routes/manager/factureFournisseur");
const fournisseur = require("../routes/manager/fournisseur");

app.use("/api/fournisseur/", fournisseur);
app.use("/api/factureFounisseur/", factureFounisseur);
app.use("/api/commandeFournisseur/", commandeFournisseur);


module.exports = app;

