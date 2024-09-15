const express = require("express");
const {
  enrollToCourse,
  unenrollFromCourse,
  getEnrolledCoursesFromUserId,
} = require("../controllers/enrollment.controller");
const router = express.Router();

router.post("/enroll", enrollToCourse);
router.delete("/unenroll/:enrollment_id", unenrollFromCourse);
router.get("/get-enrollments/:user_id", getEnrolledCoursesFromUserId);

module.exports = router;
