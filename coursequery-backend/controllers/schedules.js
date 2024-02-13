const Schedule = require("../models/Schedule");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all Schedules
// @route   GET /api/v1/schedules
// @access  Public
exports.getSchedules = asyncHandler(async (req, res, next) => {
    const schedules = await Schedule.find();
    res.status(200).json({
      success: true,
      count: schedules.length,
      data: schedules,
    });
  });
  
  // @desc    Get single schedule
  // @route   GET /api/v1/schedule/:id
  // @access  Public
  exports.getSchedule = asyncHandler(async (req, res, next) => {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return next(
        new ErrorResponse(`schedule not found with id of ${req.params.id}`),
        404
      );
    }
    res.status(200).json({ success: true, data: schedule });
  });
  
  // @desc    Create new schedule
  // @route   POST /api/v1/schedules
  // @access  Private
  exports.createSchedule = asyncHandler(async (req, res, next) => {
    // Add user to req.body 
    req.body.user = req.user.id;
  
    const schedule = await Schedule.create(req.body);
    res.status(201).json({
      success: true,
      data: schedule,
    });
  });
  
  // @desc    Update schedule
  // @route   POST /api/v1/schedule/:id
  // @access  Private
  exports.updateSchedule = asyncHandler(async (req, res, next) => {
    let schedule = await Schedule.findById(req.params.id); 
  
    if (!schedule) {
      return next(
        new ErrorResponse(`schedule not found with the id of ${req.params.id}`, 400)
      );
    }
  
    // Check if user is the creator of the schedule
    if(schedule.user.toString() !== req.user.id && req.user.role !== 'admin'){
      return next(
        new ErrorResponse(`User ${req.params.id} is not authorized to update this schedule`, 401)
      ); 
    }
  
    schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
      new: true, 
      runValidators: true
    });
  
  
    res.status(200).json({ success: true, data: schedule });
  });
  
  // @desc    Delete schedule
  // @route   DELETE /api/v1/schedule/:id
  // @access  Private
  exports.deleteSchedule = asyncHandler(async(req, res, next) => {
      const schedule = await Schedule.findById(req.params.id);
      if(!schedule){
          return res.status(400).json({ success: false });
      }
  
      if(schedule.user.toString() !== req.user.id && req.user.role !== 'admin'){
        return next(
          new ErrorResponse(`User ${req.params.id} is not authorized to delete this schedule`, 401)
        ); 
      }
  
      await Schedule.findByIdAndDelete(req.params.id);
  
      res.status(200).json({ success: true, data: {} });
  })