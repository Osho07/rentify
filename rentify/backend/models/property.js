// models/Property.js
const mongoose = require('mongoose');
const PropertySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: String,
    area: Number,
    bedrooms: Number,
    bathrooms: Number,
    nearbyAmenities: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', PropertySchema);
