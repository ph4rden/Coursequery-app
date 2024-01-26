// Imports 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')

// Retrieving MongoDB connection URL from environment variables
const mongoURL = process.env.mongoURL;

// Creating an instance of the Express application
const app = express();

app.use(cors()); // Using CORS middleware to handle Cross-Origin Resource Sharing
app.use(express.json()); // Parsing incoming JSON requests
connectDB(); // Connecting to the MongoDB database using the connectDB function

// Routing 
const courses = require('./routes/courses');
app.use('/api/v1/courses', courses);


app.use(errorHandler)

// Starting the server
const PORT = process.env.PORT || 4000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`)
    //close server and exit process 
    server.close(() => process.exit(1));
})