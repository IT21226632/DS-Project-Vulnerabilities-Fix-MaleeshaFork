const mongoose = require("mongoose");

const enrollmentSchema = mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true
    },

    userId: {
      type: String,
      required: true
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("temp-enrollment", enrollmentSchema);
