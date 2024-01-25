const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const connectDB = require('./config/db')

const mongoURL = process.env.mongoURL;
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

const PORT = process.env.PORT || 4000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
