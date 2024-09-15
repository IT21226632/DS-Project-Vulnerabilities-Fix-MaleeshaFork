const express = require("express");
const router = express.Router();
const {
	createContactRequest,
	getInstructorContactRequests,
	getAllContactRequests,
	respondToContactRequest,
	getContactRequestWithId,
} = require("../controllers/contact.controller");

// Instructor routes
router.post("/instructor/contact", createContactRequest);
router.get("/instructor/:instructorId/contacts", getInstructorContactRequests);

// Admin routes
router.get("/admin/contacts", getAllContactRequests);
router.get("/admin/contacts/:id", getContactRequestWithId);
router.put("/admin/contacts/:contactId/respond", respondToContactRequest);

module.exports = router;
