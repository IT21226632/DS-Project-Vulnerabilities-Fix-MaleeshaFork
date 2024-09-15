const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
	{
		instructorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Instructor",
			required: true,
		},
		topic: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			default: "pending",
		},
		adminResponse: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
