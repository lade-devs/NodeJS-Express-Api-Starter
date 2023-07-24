const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    token: {
        required: true,
        type: String,
        unique: true,
    },
    user_id: {
        required: true,
        type: String,
        lowercase: true,
        unique: true,
    },
    created_at: {
        required: true,
        type: Date,
        default: new Date().toISOString(),
    }
})

module.exports = mongoose.model('Auth', dataSchema);