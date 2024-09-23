const express = require("express");
const router = express.Router();
const auth_roles = require("../config/userRoles");
const {
  createNewAdmin,
  createNewInstructor,
  createNewStudent,
} = require("../controllers/registration.controller");



router.post("/register/student", createNewStudent);
router.post("/register/instructor", createNewInstructor);
router.post("/register/admin", createNewAdmin);

module.exports = router;
