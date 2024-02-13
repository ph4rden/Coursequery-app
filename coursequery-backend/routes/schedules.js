const express = require("express");
const {
    getSchedule, 
    getSchedules, 
    updateSchedule, 
    deleteSchedule,
    createSchedule
  } = require("../controllers/schedules");
const router = express.Router();

const { protect } = require("../middleware/auth");


router
    .route("/")
    .get(getSchedules)
    .post(protect, createSchedule);

router
  .route("/:id")
  .get(getSchedule)
  .put(protect, updateSchedule)
  .delete(protect, deleteSchedule);


module.exports = router;