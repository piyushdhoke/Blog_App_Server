const express = require("express");
const connectDB = require('./config/db');
const cors = require("cors");
const authRoutes = require("./Router/authenticateRouter");
const postRoutes = require("./Router/postRouter");
require("dotenv").config();
connectDB()

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // or the frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Authorization", "Content-Type"]
}));

app.use(express.json());



app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);


module.exports = app