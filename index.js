//    import     //
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const DB = require("./database/database");
const bodyParser = require('body-parser');


//////     config .env     //
dotenv.config({ path: "./.env" });
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
////    Intializing Database   //
DB();

////    Routes    //
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

//     connexion     //
const connexion = require('./importation/connexion');
app.use('/', connexion);

// ecommerce    //
const ecommerce = require('./importation/ecommerce');
app.use('/', ecommerce);

//  employer //
const employee = require('./importation/employee');
app.use('/', employee);

//    user   //
const user = require('./importation/user');
app.use('/', user);

//    comptable   //
const comptable = require('./importation/comptable');
app.use('/', comptable);

//    manager   //
const manager = require('./importation/manager');
app.use('/', manager);




///////// Port
const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
