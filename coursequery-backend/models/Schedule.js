const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, "Please add a name for the schedule"],
    trim: true,
  },
  courses: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Course'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
