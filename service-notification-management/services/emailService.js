const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // Your email configuration
  service: 'gmail',
  auth: {
    user: 'binodgayasri2001@gmail.com',
    pass: 'vmif cbxa ivey uvjk'
  }
});


const sendEmail = async (recipientEmail, subject, text) => {
  try {
    await transporter.sendMail({
      from: 'binodgayasri2001@gmail.com',
      to: recipientEmail,
      subject: subject,
      text: text
    });
    console.log('email sent');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = {sendEmail}
