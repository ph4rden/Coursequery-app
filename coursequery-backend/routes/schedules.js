const express = require("express");
const {
    getSchedule, 
    getSchedules, 
    updateSchedule, 
    deleteSchedule,
    createSchedule,
    addCourseToSchedule,
  } = require("../controllers/schedules");
const router = express.Router();

const { protect } = require("../middleware/auth");

router.route("/:scheduleId/courses/:courseId").post(protect, addCourseToSchedule);

router
    .route("/")
    .post(protect, createSchedule);

router.route("/user/:userId").get(protect, getSchedules);

router
  .route("/:id")
  .get(protect, getSchedule)
  .put(protect, updateSchedule)
  .delete(protect, deleteSchedule);


module.exports = router;