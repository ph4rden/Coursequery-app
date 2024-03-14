const mongoose = require("mongoose");
const slugify = require("slugify");

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a Course title"],
    },
    days: [
        {
            type: String,
            enum: ["monday", "tuesday", "wednesday", "thursday", "friday"],
            required: true,
        },
    ],
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    slug: String,
    professor: String,
    location: String,
    description: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
});

CourseSchema.pre("save", function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

module.exports = mongoose.model("Course", CourseSchema);
