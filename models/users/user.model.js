const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');

const UserSchema = mongoose.Schema({
    user_id: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
        type: String,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['Admin', 'Editor', 'Viewer']
    }
}, {
    timestamps: true,
    collection: 'User'
})


module.exports = mongoose.model('User', UserSchema);