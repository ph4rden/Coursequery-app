const mongoose = require("mongoose");
const slugify = require("slugify");

const ScheduleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a Schedule name"],
      },
})