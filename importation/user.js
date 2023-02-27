const express = require("express");
const app = express();

const user = require("../routes/user/user");
const client = require("../routes/user/client");
const admin = require("../routes/user/admin");
const employee = require("../routes/user/employee");
const manager = require("../routes/user/manager");
const comptable = require("../routes/user/comptable.js");



app.use("/api/user/", user);
app.use("/api/admin/", admin);
app.use("/api/client/", client);
app.use("/api/manager/", manager);
app.use("/api/employee/", employee);
app.use("/api/comptable/", comptable);
module.exports = app;