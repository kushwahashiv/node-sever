const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    response: {
        type: String
    },
    currentTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Survey', surveySchema);