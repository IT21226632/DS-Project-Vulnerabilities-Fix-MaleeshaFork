const courseEnrollment = require('../models/enrollment');
const emailService = require('../services/emailService');
const smsService = require('../services/smsService');
const Notification = require('../models/notification');
const Students = require('../models/student');

const sendEmail = async (req, res) => {
  try {
    // Email details
    const { recipientEmail, subject, text } = req.body;

    const newNotification = new Notification({
      message: text,
      recipient: recipientEmail,
      emailSubject: subject,
      notificationType: "email"
    });
  
    // Send email to one user
    await emailService.sendEmail(recipientEmail, subject, text);
    await newNotification.save()

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const sendEmailsAll = async (req, res) => {
  try {
    
    const { recipientEmail, subject, text } = req.body;

    const newNotification = new Notification({
      message: text,
      recipient: "All students",
      emailSubject: subject,
      notificationType: "email"
    });
  
    // Send emails to all
    const users = await Students.find({}, 'email'); 

    // Send emails to users
    for (const user of users) {
        await emailService.sendEmail(user.email, subject, text); 
    }
    await newNotification.save()

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const sendSMS = async (req, res) => {
  try {
    const { recipientPhoneNo, message } = req.body;

    const newNotification = new Notification({
      message: message,
      recipient: recipientPhoneNo,
      notificationType: "sms"
    });

    // Send sms to one user
    await smsService.sendSMS(recipientPhoneNo, message);
    await newNotification.save()

    res.status(200).json({ message: 'SMS sent successfully' });
  } catch (error) {
    console.error('Error sending sms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const sendSMSAll = async (req, res) => {
  try {
    const { recipientPhoneNo, message } = req.body;

    const newNotification = new Notification({
      message: message,
      recipient: "All students",
      notificationType: "sms"
    });
  
    // fetch all students
    const users = await Students.find({}, 'phone_number'); 

    // Send sms to all students
    for (const user of users) {
        await smsService.sendSMS(user.phone_number, message); 
    }

    await newNotification.save()

    res.status(200).json({ message: 'SMS sent to all successfully' });
  } catch (error) {
    console.error('Error sending sms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller to get notification history
const getNotificationHistory = async (req, res) => {
  try {
    // Fetch notification history from the database
    const notificationHistory = await Notification.find().sort({ dateTime: -1 });

    // Separate notifications into SMS and email history
    const emailHistory = notificationHistory.filter(notification => notification.notificationType === 'email');
    const smsHistory = notificationHistory.filter(notification => notification.notificationType === 'sms');

    
    
    res.status(200).json({ smsHistory, emailHistory });
  } catch (error) {
    console.error('Error fetching notification history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {sendEmail, sendEmailsAll, sendSMS, sendSMSAll, getNotificationHistory}
