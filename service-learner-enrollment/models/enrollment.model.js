const mongoose = require("mongoose");

const enrollmentSchema = mongoose.Schema(
  {
    purchased_by: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
    },
    course_id: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);
