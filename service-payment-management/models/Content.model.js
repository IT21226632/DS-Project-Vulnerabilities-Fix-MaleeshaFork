const mongoose = require("mongoose");

const OptionSchema = mongoose.Schema(
{
    lectureVideo: {
        type: String,
        required: true
    },

    lectureName: {
        type: String,
        required: true
    },

    lectureNote: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model("Content", OptionSchema);