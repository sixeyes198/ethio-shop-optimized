require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./utilities");

const { User } = require("./Models/user_model");
const ContactRoute = require("./Routes/contact");
const paymentsRoutes = require("./Routes/payments");
const productRoutes = require("./Routes/products");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "https://ethio-shop-b0zq.onrender.com",
  })
);


// MongoDB connection 
const connectionString = process.env.MONGODB_CONNECT;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("connected To MongoDB");
  })
  .catch((err) => {
    console.error(err, "Error connecting To MongoDB");
  });





// Create Account
app.post("/api/Signup", async (req, res) => {
  const { fullName, email, password, role } = req.body;
  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full Name is required" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.json({ error: true, message: "User already exist" });
  }

  const exisitingAdmin = await User.findOne({ role: "admin" });

  const newUser = new User({
    fullName,
    email,
    password,
    role: exisitingAdmin ? "user" : role || "user",
  });

  await newUser.save();

  const accessToken = jwt.sign(
    { user: newUser },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30000m",
    }
  );

  return res.json({
    error: false,
    newUser,
    accessToken,
    message: "Registration Successful",
  });
});

//Login
app.post("/api/login", async (req, res) => {
  console.log("Login request body", req.body);

  const { email, password } = req.body;

  if (!email) {
    return res.json({ message: "Email is required" });
  }
  if (!password) {
    return res.json({ message: "Password is required" });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30000m",
    });

    return res.json({
      error: false,
      message: "Login successful",
      email,
      accessToken,
      role: userInfo.role,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid credentials",
    });
  }
});

//Get user
app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;

  const isUser = await User.findOne({ _id: user._id });
  if (!isUser) {
    return res.sendStatus(401);
  }
  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      role: isUser.role,
      createdOn: isUser.createdOn,
    },
    message: "",
  });
});

// Check for Errors in the Api Routers 
app.use("/api/contact", ContactRoute);
app.use("/api/payments", paymentsRoutes);
app.use("/api/products", productRoutes);

app.use(express.static(path.join(__dirname, "../frontend/ethio-shop/dist")));




app.use( (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../frontend/ethio-shop/dist", "index.html")
  );
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});

module.exports = app;