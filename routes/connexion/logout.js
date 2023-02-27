const express = require("express");

const session = require("express-session");

const router = express.Router();

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).send({ error: error.message });
    }
    res.clearCookie("connect.sid");
    return res.status(200).send({ message: "Déconnexion réussie" });
  });
});

module.exports = router;
