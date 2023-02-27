const express = require("express");
const app = express();

const signup = require("../routes/connexion/signup");
const login = require("../routes/connexion/login");
const logout = require("../routes/connexion/logout");
const passwordOublier = require("../routes/connexion/password-oublier");


app.use("/api/lougout/", logout);
app.use("/api/password-oublier/", passwordOublier);
app.use("/api/login/", login);
app.use("/api/signup/", signup);

module.exports = app;