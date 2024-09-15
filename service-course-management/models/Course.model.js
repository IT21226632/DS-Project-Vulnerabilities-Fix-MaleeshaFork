const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseSchema = new Schema({

    courseId: {
        type: String,
        required: true
    },

    courseName: {
        type: String,
        required: true
    },

    courseImage: {
        type: String,
        required: true
    },

    specialization: {
        type: String,
        required: true
    },

    courseDescription: {
        type: String,
        required: true
    },

    coursePrice: {
        type: Number,
        required: true
    },

    courseContent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content'
    }],

    skills: [{
        type: String,
        required: true
    }],

    courseStatus: {
        type: String,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor'
    },
      
}, {timestamps: true});

module.exports = mongoose.model("Course", CourseSchema);




