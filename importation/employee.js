
const express = require("express");
const app = express();

const mission = require("../routes/employer/mission");
const congé = require("../routes/employer/congé");
const presence = require("../routes/employer/presence");

app.use("/api/mission/", mission);
app.use("/api/conge/", congé);
app.use("/api/presence/", presence);


module.exports = app;