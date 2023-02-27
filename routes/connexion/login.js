const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/user/User");
const Validate = require("../../validations/loginValidation");
const router = express.Router();
const session = require("express-session");

router.post("/", async (req, res) => {
  
  
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
  });

  try {
    
    const user = await User.findOne({ email: newUser.email });

    if (user) {
      const validPassword = await bcrypt.compare(
        newUser.password,
        user.password
      );
      if (validPassword) {
        const token = jwt.sign(
          {
            _id: user._id,
            username: user.username,
            email: user.email,
          },
          process.env.SECRET_KEY
        );
        
        res.status(200).json({token:token});
        
      } else {
       res.status(401).json({message:"Mot de passe incorrect"});
      }
    } else if (!user) {
      res.status(401).json({message:"Compte utilisateur invalide"});
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
