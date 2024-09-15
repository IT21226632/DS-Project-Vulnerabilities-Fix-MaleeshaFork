const { model } = require("mongoose");
const CourseModel = require("../models/Course.model");
const ContentModel = require("../models/Content.model");
const asyncHandler = require("express-async-handler");

const createCourse = asyncHandler(async (req, res) => {
    const { courseId, courseName, courseImage, specialization , courseDescription , coursePrice , courseContent , skills , courseStatus , userId } = req.body;

    try {
        // Create Content first
        const createdContents = await ContentModel.insertMany(courseContent);

        // Extract IDs of created contents
        const contentIds = createdContents.map(option => option._id);

        // Create course and associate content IDs
        const newCourse = await CourseModel.create({
            courseId,
            courseName,
            courseImage,
            specialization,
            courseDescription,
            coursePrice,
            courseContent: contentIds, // Assign option IDs to the question
            skills,
            courseStatus:'Pending',
            userId
        });

		// Update the question field in each option to reference the new question
		await ContentModel.updateMany(
			{ _id: { $in: contentIds } },
			{ $set: { courseId: newCourse._id } }
		);

		res.status(201).json({
			message: "Course created successfully",
			question: newCourse,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Fetch all data

const getAllCourses = asyncHandler(async (req, res) => {
	const courses = await CourseModel.find().populate("courseContent");

	if (courses.length > 0) {
		res.status(200).json(courses);
	} else {
		res.status(404).json({ message: "No course found" });
	}
});

const getAllApprovedCourses = asyncHandler(async (req, res) => {
	const courses = await CourseModel.find({
		courseStatus: "Approved",
	}).populate("courseContent");

	if (courses.length > 0) {
		res.status(200).json(courses);
	} else {
		res.status(404).json({ message: "No course found" });
	}
});

const getAllCoursesWithInstructor = asyncHandler(async (req, res) => {
	const courses = await CourseModel.find()
		.populate("courseContent")
		.populate("userId");

	if (courses.length > 0) {
		res.status(200).json(courses);
	} else {
		res.status(404).json({ message: "No course found" });
	}
});

const getAllCourseIds = asyncHandler(async (req, res) => {
	try {
		const courseIds = await CourseModel.find({}, "_id");

		if (courseIds.length > 0) {
			res.status(200).json(courseIds);
		} else {
			res.status(404).json({ message: "No content IDs found" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

const getCoursById = asyncHandler(async (req, res) => {
	try {
		const id = req.params.id;

		// Find the question by ID and populate the options
		const course = await CourseModel.findById(id)
			.populate("courseContent")
			.populate("userId");

		if (course) {
			res.status(200).json(course);
		} else {
			res.status(404).json({ error: "Course not found" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

const getAllContents = asyncHandler(async (req, res) => {
	const response2 = await CourseModel.find({});

	if (response2) {
		res.status(201).json(response2);
	} else {
		res.status(200).json("no question found");
	}
});

const getContentDetailsById = asyncHandler(async (req, res) => {
	try {
		const id = req.params.id;

        // Find the content by ID
        const content = await ContentModel.findById(id);

		if (content) {
			res.status(200).json(content);
		} else {
			res.status(404).json({ error: "Content not found" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

const updateQuestionWithOptions = asyncHandler(async (req, res) => {
	const id = req.params.id; // Extract courseId from URL parameters
	const {
		courseId,
		courseName,
		courseImage,
		specialization,
		courseDescription,
		coursePrice,
		skills,
	} = req.body;

	try {
		// Update the course
		const updatedCourse = await CourseModel.findByIdAndUpdate(
			id,
			{
				courseId,
				courseName,
				courseImage,
				specialization,
				courseDescription,
				coursePrice,
				skills,
			},
			{ new: true } // Return the updated document
		);

		if (!updatedCourse) {
			return res.status(404).json({ error: "Course not found" });
		}

		res.status(200).json(updatedCourse);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

const addContentToCourse = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { lectureVideo, lectureName, lectureNote } = req.body;

	try {
		// Find the existing course
		const existingCourse = await CourseModel.findById(id);

		if (!existingCourse) {
			return res.status(404).json({ error: "Course not found" });
		}

		// Create the new content
		const newContent = await ContentModel.create({
			lectureVideo,
			lectureName,
			lectureNote,
		});

		// Associate the new content with the existing course
		existingCourse.courseContent.push(newContent._id);

		// Save the course with the updated content
		await existingCourse.save();

		res.status(200).json({
			message: "Content added to course successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

const updateContent = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { lectureVideo, lectureName, lectureNote } = req.body;

	try {
		// Find the content to update
		const existingContent = await ContentModel.findById(id);

		if (!existingContent) {
			return res.status(404).json({ error: "Content not found" });
		}

		// Update the content
		existingContent.lectureVideo = lectureVideo;
		existingContent.lectureName = lectureName;
		existingContent.lectureNote = lectureNote;

		// Save the updated content
		await existingContent.save();

		res.status(200).json({
			message: "Content updated successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// const deleteContent = asyncHandler(async (req, res) => {
//     const { id } = req.params;

//     const checkInstance = await ContentModel.findById(id);

//   if (checkInstance) {
//     const response = await ContentModel.findByIdAndDelete(id);
//     if (response) {
//       res.status(200).json({
//         message: "Content deleted"
//       });
//     } else {
//       res.status(403).json("Content cannot be deleted");
//     }
//   } else {
//     res.status(404).json("Content does not exist in the database");
//   }
// });

const deleteContent = asyncHandler(async (req, res) => {
	const { courseId, id } = req.params; // Corrected

	try {
		// Find the existing course
		const existingCourse = await CourseModel.findOne({ courseId }); // Corrected

		if (!existingCourse) {
			return res.status(404).json({ error: "Course not found" });
		}

		// Find the content to delete
		const existingContentIndex = existingCourse.courseContent.indexOf(id);

		if (existingContentIndex === -1) {
			return res
				.status(404)
				.json({ error: "Content not found in the course" });
		}

		// Remove the content from the course's array
		existingCourse.courseContent.splice(existingContentIndex, 1);

		// Save the course with the updated content array
		await existingCourse.save();

		// Delete the content from the ContentModel
		await ContentModel.findByIdAndDelete(id);

		res.status(200).json({
			message: "Content deleted from course successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

const deleteCourse = asyncHandler(async (req, res) => {
	const { courseId } = req.params;

	try {
		// Find the existing course
		const existingCourse = await CourseModel.findOne({ courseId });

		if (!existingCourse) {
			return res.status(404).json({ error: "Course not found" });
		}

		// Delete the course's content from the ContentModel
		await ContentModel.deleteMany({
			_id: { $in: existingCourse.courseContent },
		});

		// Delete the course
		await CourseModel.findByIdAndDelete(existingCourse._id);

		res.status(200).json({
			message: "Course and associated content deleted successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = {
	createCourse,
	getAllCourses,
	getAllContents,
	getAllCoursesWithInstructor,
	getAllApprovedCourses,
	getContentDetailsById,
	getCoursById,
	getAllCourseIds,
	updateQuestionWithOptions,
	addContentToCourse,
	updateContent,
	deleteContent,
	deleteCourse,
};
