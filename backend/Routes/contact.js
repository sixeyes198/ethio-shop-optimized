// Check for Errors...

const express = require("express");
const router = express.Router();
const { ContactMessage } = require("../Models/user_model");
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  const { name, phone, email, message } = req.body;

  try {
    //Saving to DB
    const newMessage = new ContactMessage({ name, phone, email, message });
    await newMessage.save();

    //Email config
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      subject: "New Contact Form Submmision",
      text: `You have a new message: Name: ${name} Phone: ${phone} Email: ${email} Message: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message recieved and email sent." });
  } catch (error) {
    console.error("Error submitting contact form", error);
    res.status(500).json({ error: "Failed to submit Message" });
  }
});

module.exports = router;
