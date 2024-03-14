const Course = require("../models/Course");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const mongoose = require("mongoose");
const Schedule = require("../models/Schedule");

// @desc    Get all Courses
// @route   GET /api/v1/courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  const courses = await Course.find();
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

// @desc    Get single course
// @route   GET /api/v1/courses/:id
// @access  Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id of ${req.params.id}`),
      404
    );
  }
  res.status(200).json({ success: true, data: course });
});

// @desc    Create new course
// @route   POST /api/v1/courses
// @access  Private
exports.createCourse = asyncHandler(async (req, res, next) => {
  // Add user to req.body 
  req.body.user = req.user.id;

  const course = await Course.create(req.body);
  res.status(201).json({
    success: true,
    data: course,
  });
});

// @desc    Update course
// @route   POST /api/v1/courses/:id
// @access  Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id); 

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with the id of ${req.params.id}`, 400)
    );
  }

  // Check if user is the creator of the course
  if(course.user.toString() !== req.user.id && req.user.role !== 'admin'){
    return next(
      new ErrorResponse(`User ${req.params.id} is not authorized to update this course`, 401)
    ); 
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true, 
    runValidators: true
  });


  res.status(200).json({ success: true, data: course });
});

// @desc    Delete course
// @route   DELETE /api/v1/courses/:id
// @access  Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(400).json({ success: false });
  }

  if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.params.id} is not authorized to delete this course`, 401));
  }

  // Proceed with deletion using deleteOne as findByIdAndDelete is essentially a shorthand for this
  await Course.deleteOne({ _id: req.params.id });

  // Manually perform the operation intended for the post-remove middleware
  await Schedule.updateMany(
    { courses: req.params.id },
    { $pull: { courses: req.params.id } }
  );

  res.status(200).json({ success: true, data: {} });
});
