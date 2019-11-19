const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    brand: {
        name: {
            type: String,
            required: true
        },
        popularity: {
            type: Boolean,
            required: true
        }
    },

    category: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    details: {
        type: String
    },

    isOnSale: {
        type: Boolean,
        required: true,
        default: false
    },
    isFeatured: {
        type: Boolean
    },
    imageUrl: {
        type: String
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    },

    remaining: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('item', ItemSchema);