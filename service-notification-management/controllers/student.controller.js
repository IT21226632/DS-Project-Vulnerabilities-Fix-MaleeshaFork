const courseEnrollment = require('../models/enrollment');
const emailService = require('../services/emailService');
const smsService = require('../services/smsService');
const Student = require('../models/student');

// Controller to get notification history
const getAllStudentsEmails = async (req, res) => {
  try {
    // Fetch students from the database
    const emails = await Student.find({}, 'email'); ;
    
    res.status(200).json({ emails });
  } catch (error) {
    console.error('Error fetching:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllStudentsPhoneNos = async (req, res) => {
    try {
      // Fetch students from the database
      const phoneNos = await Student.find({}, 'phone_number'); ;
      
      res.status(200).json({ phoneNos });
    } catch (error) {
      console.error('Error fetching:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {getAllStudentsEmails, getAllStudentsPhoneNos}
