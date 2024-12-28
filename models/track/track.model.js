const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const TrackSchema = new mongoose.Schema({
    track_id: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true,
    },
    artist_id: {
        type: String,
        required: true
    },
    album_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    hidden: {
        type: Boolean,
        default: false,
    },
}, {
    collection: "Track",
    timestamps: true
});

module.exports = mongoose.model('Track', TrackSchema);
