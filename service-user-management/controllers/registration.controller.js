const studentModel = require("../models/student.model");
const instructorModel = require("../models/instructor.model");
const adminModel = require("../models/admin.model");
const bcrypt = require("bcrypt");
const profile_pics = require("../config/defaultProfilePics");

const { student_pic, instructor_pic, admin_pic } = profile_pics;

//regex logic to validate phone number
const phoneNumberRegex = /^(?:\+94|0)?\d{10}$/;

const isValidPhoneNumber = (phoneNumber) => {
  return phoneNumberRegex.test(phoneNumber);
};

//student registration method
const createNewStudent = async (req, res) => {
  const { email, username, password, phone_number } = req.body;

  if (!email || !username || !password || !phone_number) {
    return res.status(400).json({
      message:
        "please provide the necessary details (email, password, username, phone_number)",
    });
  }

  const saltRounds = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  //check provided email is already registered as any role
  let duplicate = await studentModel.findOne({ email }).exec();

  if (!duplicate) {
    duplicate = await instructorModel.findOne({ email }).exec();
  }

  if (!duplicate) {
    duplicate = await adminModel.findOne({ email }).exec();
  }

  if (duplicate) {
    return res
      .status(400)
      .json({ message: "This email is already registered to the system!" });
  }

  if (!isValidPhoneNumber(phone_number)) {
    return res.status(400).json({
      message: "please provide valid phone number!",
    });
  }

  try {
    const result = await studentModel.create({
      email,
      username,
      password: hashedPassword,
      phone_number,
      profile_picture: student_pic,
    });

    if (result) {
      const roles = Object.values(result.user_roles);
      return res.status(201).json({
        email: result.email,
        username: result.username,
        profile_picture: result.profile_picture,
        roles,
      });
    } else {
      return res
        .status(400)
        .json({ message: "student account could not be created!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//instructor registration method
const createNewInstructor = async (req, res) => {
  const { email, username, password, phone_number } = req.body;

  if (!email || !username || !password || !phone_number) {
    return res.status(400).json({
      message:
        "please provide the necessary details (email, password, username, phone_number)",
    });
  }

  const saltRounds = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  //check provided email is already registered as any role
  let duplicate = await studentModel.findOne({ email }).exec();

  if (!duplicate) {
    duplicate = await instructorModel.findOne({ email }).exec();
  }

  if (!duplicate) {
    duplicate = await adminModel.findOne({ email }).exec();
  }

  if (duplicate) {
    return res
      .status(400)
      .json({ message: "This email is already registered to the system!" });
  }

  if (!isValidPhoneNumber(phone_number)) {
    return res.status(400).json({
      message: "please provide valid phone number!",
    });
  }

  try {
    const result = await instructorModel.create({
      email,
      username,
      password: hashedPassword,
      phone_number,
      profile_picture: instructor_pic,
    });

    if (result) {
      const roles = Object.values(result.user_roles);
      return res.status(201).json({
        email: result.email,
        username: result.username,
        profile_picture: result.profile_picture,
        roles,
      });
    } else {
      return res
        .status(400)
        .json({ message: "instructor account could not be created!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// admin registration method
const createNewAdmin = async (req, res) => {
  const { email, username, password, phone_number } = req.body;

  if (!email || !username || !password || !phone_number) {
    return res.status(400).json({
      message:
        "please provide the necessary details (email, password, username, phone_number )",
    });
  }

  const saltRounds = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  //check provided email is already registered as any role
  let duplicate = await studentModel.findOne({ email }).exec();

  if (!duplicate) {
    duplicate = await instructorModel.findOne({ email }).exec();
  }

  if (!duplicate) {
    duplicate = await adminModel.findOne({ email }).exec();
  }

  // if found a duplicate
  if (duplicate) {
    return res
      .status(400)
      .json({ message: "This email is already registered to the system!" });
  }

  if (!isValidPhoneNumber(phone_number)) {
    return res.status(400).json({
      message: "please provide valid phone number!",
    });
  }

  try {
    const result = await adminModel.create({
      email,
      username,
      password: hashedPassword,
      phone_number,
      profile_picture: admin_pic,
    });

    if (result) {
      const roles = Object.values(result.user_roles);
      return res.status(201).json({
        email: result.email,
        username: result.username,
        profile_picture: result.profile_picture,
        roles,
      });
    } else {
      return res
        .status(400)
        .json({ message: "admin account could not be created!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createNewAdmin,
  createNewInstructor,
  createNewStudent,
};
