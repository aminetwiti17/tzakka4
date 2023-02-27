const express = require("express");
const router = express.Router();
const createuser = require("../../middleware/createuser");

router.post("/", async (req, res, next) => {
  
  try {
    await createuser(req, res, next);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
