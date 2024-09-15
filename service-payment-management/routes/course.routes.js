const express = require("express");
const {
  createCourse,
  getCourses,
} = require("../controllers/createDummyCourse");
const router = express.Router();

router.post("/create", createCourse);
router.get("/get", getCourses);

module.exports = router;
