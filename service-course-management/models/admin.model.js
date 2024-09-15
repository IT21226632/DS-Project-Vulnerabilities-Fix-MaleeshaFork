const mongoose = require("mongoose");
const user_roles = require("../config/userRoles");

const { Student, Admin, Instructor } = user_roles;

const adminSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "valid email address is required!"],
    },

    username: {
      type: String,
      required: [true, "valid usernameis required!"],
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
      Instructor: {
        type: Number,
        default: Instructor,
      },
      Admin: {
        type: Number,
        default: Admin,
      },
    },

    refresh_token: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
