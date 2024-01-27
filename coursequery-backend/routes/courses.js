const express = require("express");
const {
  getCourses,
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');


router
    .route("/")
    .get(getCourses)
    .post(protect, createCourse);

router
  .route("/:id")
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;