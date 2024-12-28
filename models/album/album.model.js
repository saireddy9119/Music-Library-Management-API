const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const AlbumSchema = new mongoose.Schema({
    album_id: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: Number,
        required: true,
        max: new Date().getFullYear(),
    },
    hidden: {
        type: Boolean,
        default: false,
    },
}, {
    collection: "Album",
    timestamps: true
});

module.exports = mongoose.model('Album', AlbumSchema);
