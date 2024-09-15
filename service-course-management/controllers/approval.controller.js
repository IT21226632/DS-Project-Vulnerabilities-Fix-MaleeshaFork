const courseModel = require("../models/Course.model");

const approveCourse = async (req, res) => {
	const { id } = req.params;

	if (!id) {
		return res.status(400).json({ message: "course_id can not be found." });
	}

	try {
		const foundCourse = await courseModel.findById(id);

		if (foundCourse) {
			let updatedCourse = null;
            if(foundCourse.courseStatus === "Pending"){
                updatedCourse = await courseModel.findByIdAndUpdate(
                    foundCourse._id,
                    { courseStatus: "Approved" }
                );
            }
            else{
                updatedCourse = await courseModel.findByIdAndUpdate(
                    foundCourse._id,
                    { courseStatus: "Pending" }
                );
            }

			if (updatedCourse) {
				return res.status(200).json({ message: "Course status updated!" });
			} else {
				return res
					.status(400)
					.json({ message: "course status can not be updated!" });
			}
		}
	} catch (error) {
		return res.status(400).json({ message: "course state change failed!" });
	}
};

module.exports = {
	approveCourse,
};
