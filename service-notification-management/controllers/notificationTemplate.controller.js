// Import necessary modules and models
const Template = require('../models/notificationTemplate');

// Controller to create a new message template
exports.createMessageTemplate = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newTemplate = new Template({ title, content });
    await newTemplate.save();
    res.status(201).json({ message: 'Notification Template created successfully' });
  } catch (error) {
    console.error('Error creating template:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMessageTemplateList = async (req, res) => {
    try {
      // Fetch templates from the database
      const messageTemplateList = await Template.find();
  
      res.status(200).json( messageTemplateList );
    } catch (error) {
      console.error('Error fetching templates:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

