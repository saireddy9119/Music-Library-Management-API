const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const FavoriteSchema = new mongoose.Schema({
    favorite_id: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    item_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: "Favorites"
});

module.exports = mongoose.model('Favorite', FavoriteSchema);

