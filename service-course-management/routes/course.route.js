const express = require("express");
const router = express.Router();

const {
	createCourse,
	getAllCourses,
	getAllApprovedCourses,
	getAllCoursesWithInstructor,
	getAllContents,
	getContentDetailsById,
	getCoursById,
	getAllCourseIds,
	updateQuestionWithOptions,
	addContentToCourse,
	updateContent,
	deleteContent,
	deleteCourse,
} = require("../controllers/course.controller");

const { approveCourse } = require("../controllers/approval.controller");

router.post("/create-course", createCourse);
router.get("/get-all-courses", getAllCourses);
router.get("/get-all-approved-courses", getAllApprovedCourses);
router.get("/get-all-courses-with-instructor", getAllCoursesWithInstructor);
router.get("/get-all-contents", getAllContents);
router.get("/get-content/:id", getContentDetailsById);
router.get("/get-course/:id", getCoursById);
router.get("/get-all-course-ids", getAllCourseIds);
router.patch("/update-course/:id", updateQuestionWithOptions);
router.post("/add-content/:id", addContentToCourse);
router.patch("/update-content/:id", updateContent);
router.delete("/getcourse/:courseId/content/:id", deleteContent);
router.delete("/delete-courses/:courseId", deleteCourse);

router.put("/approve-course/:id", approveCourse);

// router.get("/get-option/:id", getOptionById);

module.exports = router;
