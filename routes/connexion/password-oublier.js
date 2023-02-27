const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../../models/user/User");

// Route to handle forgot password request
router.post("/", async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send({ error: "Email not found" });
    
    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash reset token and set it as the user's resetPasswordToken
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send reset password email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "youremail@gmail.com",
        pass: "yourpassword",
      },
    });
    const mailOptions = {
      from: "youremail@gmail.com",
      to: user.email,
      subject: "Reset password",
      html: `
        <p>You requested a password reset</p>
        <p>Click this <a href="http://localhost:3000/reset-password/${resetToken}">link</a> to set a new password</p>
      `,
    };
    await transporter.sendMail(mailOptions);

    return res.status(200).send({ message: "Password reset email sent" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// Route to handle reset password request
router.post("/reset-password/:token", async (req, res) => {
  try {
    // Find user by reset password token
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user)
      return res
        .status(400)
        .send({ error: "Invalid Token or Session Expired" });
    // Set new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    // Send success response
    return res.status(200).send({ message: "Password Reset Successful" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
module.exports = router;
