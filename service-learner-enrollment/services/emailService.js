const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // Your email configuration
  service: 'gmail',
  auth: {
    user: 'binodgayasri2001@gmail.com',
    pass: 'vmif cbxa ivey uvjk'
  }
});

const sendConfirmationEmail = async (course_id, user_id) => {
  try {
    
    await transporter.sendMail({
      from: 'binodgayasri2001@gmail.com',
      to: 'binodhetti@gmail.com',
      subject: 'Enrollment Confirmation',
      text: `Dear student, you have successfully enrolled in course ${course_id}.`
    });
    console.log('Confirmation email sent');
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};


module.exports = {sendConfirmationEmail}
