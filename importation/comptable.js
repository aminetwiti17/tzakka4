const express = require("express");
const app = express();

const avance = require("../routes/comptable/avance");
const fichedepaie = require("../routes/comptable/fichedepaie");
const depense = require("../routes/comptable/depense");
const grandlivre = require("../routes/comptable/grandlivre.js");
const transaction = require("../routes/comptable/transaction.js");
const compte = require("../routes/comptable/compte");


app.use("/api/avance", avance);
app.use("/api/fichedepaie/", fichedepaie);
app.use("/api/depense/", depense);
app.use("/api/grandlivre/", grandlivre);
app.use("/api/transaction/", transaction);
app.use("/api/compte/", compte);

module.exports = app;

