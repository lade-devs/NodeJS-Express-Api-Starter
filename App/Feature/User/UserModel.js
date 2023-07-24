const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        lowercase: true
    },
    email: {
        required: true,
        type: String,
        lowercase: true,
        unique: true,
    },
    password: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String
    },
    created_at: {
        required: true,
        type: Date,
        default: new Date().toISOString(),
    }
})

module.exports = mongoose.model('User', dataSchema);