const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        lowercase: true
    },
    author: {
        required: true,
        type: String,
        lowercase: true
    },
    content: {
        required: true,
        type: String
    },
    created_at: {
        required: true,
        type: Date,
        default: new Date().toISOString(),
    }
})

module.exports = mongoose.model('Post', dataSchema)