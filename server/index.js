const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect.js");
const authRoutes = require("./routes/auth.js");
// const messageRoutes = require("./routes/message.js");

// Express Object
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// Database connection
dbConnect();

// Listen to Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
