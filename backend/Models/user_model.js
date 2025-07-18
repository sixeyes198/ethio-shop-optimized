const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdOn: { type: Date, default: new Date().getTime() },
});

const contactMesssageSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String },
  email: { type: String },
  message: { type: String },
  createdOn: { type: Date, default: new Date().getTime() },
});

const User = mongoose.model("user", userSchema);
const ContactMessage = mongoose.model("ContactMessage",contactMesssageSchema);

module.exports = {User, ContactMessage};