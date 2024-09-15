const mongoose = require("mongoose");
const user_roles = require("../config/userRoles");
const { Student } = user_roles;

const studentSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "valid email address is required!"],
    },

    username: {
      type: String,
      required: [true, "valid username is required!"],
    },

    password: {
      type: String,
      required: [true, "valid password is required!"],
    },

    phone_number: {
      type: String,
      required: [true, "valid phone number is required!"],
    },

    profile_picture: {
      type: String,
      required: false,
    },

    user_roles: {
      Student: {
        type: Number,
        default: Student,
      },
    },

    refresh_token: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("temp-student", studentSchema);
