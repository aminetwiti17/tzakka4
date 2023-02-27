const express = require("express");
const app = express();

const cart = require("../routes/ecommerce/cart");
const product = require("../routes/ecommerce/product");
const devis = require("../routes/ecommerce/devis");
const categorie = require("../routes/ecommerce/categorie");
const commande = require("../routes/ecommerce/commande");
const lignecommande = require("../routes/ecommerce/lignedecommande");
const factureClient = require("../routes/ecommerce/factureClient");
const service = require("../routes/ecommerce/service");
const rate = require("../routes/ecommerce/rate");
const livraison = require("../routes/ecommerce/livraison");
const reclamation = require("../routes/ecommerce/reclamation");
const adresse = require("../routes/ecommerce/adresse");


app.use("/api/product/", product);
app.use("/api/rate/", rate);
app.use("/api/categorie/", categorie);
app.use("/api/commande/", commande);
app.use("/api/service/", service);
app.use("/api/factureClient", factureClient);
app.use("/api/livraison/", livraison);
app.use("/api/devis/", devis);
app.use("/api/cart/", cart);
app.use("/api/reclamation/", reclamation);
app.use("/api/lignecommande/", lignecommande);
app.use("/api/adresse/", adresse);


module.exports = app;