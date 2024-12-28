const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const ArtistSchema = new mongoose.Schema({
    artist_id: {
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
    grammy: {
        type: Number,
        default: 0,
    },
    hidden: {
        type: Boolean,
        default: false,
    },
}, {
    collection: 'Artist',
    timestamps: true
});


module.exports = mongoose.model('Artist', ArtistSchema);
