// Imports 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

const mongoURL = process.env.mongoURL;
const app = express();

app.use(cors()); 
app.use(express.json());
app.use(cookieParser());
connectDB(); 

// Routing 
const courses = require('./routes/courses');
const schedules = require('./routes/schedules');
const auth = require('./routes/auth');

// Mount routers
app.use('/api/v1/courses', courses);
app.use('/api/v1/schedules', schedules);
app.use('/api/v1/auth', auth);


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