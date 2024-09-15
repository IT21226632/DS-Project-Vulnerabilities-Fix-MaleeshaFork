const Contact = require("../models/contact.model");
const Instructor = require("../models/instructor.model");
const Admin = require("../models/admin.model");
const asyncHandler = require("express-async-handler");

// Create a new contact request
const createContactRequest = asyncHandler(async (req, res) => {
	const { instructorId, topic, description } = req.body;

	// Validate if the instructor exists
	const instructor = await Instructor.findById(instructorId);
	if (!instructor) {
		return res.status(404).json({ error: "Instructor not found" });
	}

	try {
		const newContact = await Contact.create({
			instructorId,
			topic,
			description,
		});

		res.status(201).json(newContact);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Get all contact requests for an instructor
const getInstructorContactRequests = asyncHandler(async (req, res) => {
	const instructorId = req.params.instructorId;

	try {
		const contactRequests = await Contact.find({ instructorId });
		res.status(200).json(contactRequests);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Get all contact requests for the admin
const getAllContactRequests = asyncHandler(async (req, res) => {
	try {
		const contactRequests = await Contact.find().populate("instructorId");
		res.status(200).json(contactRequests);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Get all contact requests for the admin
const getContactRequestWithId = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const contactRequest = await Contact.findById(id).populate(
			"instructorId"
		);
		res.status(200).json(contactRequest);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Respond to a contact request
const respondToContactRequest = asyncHandler(async (req, res) => {
	const contactId = req.params.contactId;
	const { adminResponse } = req.body;

	try {
		const updatedContact = await Contact.findByIdAndUpdate(
			contactId,
			{ adminResponse, status: "resolved" },
			{ new: true }
		);

		if (!updatedContact) {
			return res.status(404).json({ error: "Contact request not found" });
		}

		res.status(200).json(updatedContact);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = {
	createContactRequest,
	getInstructorContactRequests,
	getAllContactRequests,
	respondToContactRequest,
	getContactRequestWithId,
};
