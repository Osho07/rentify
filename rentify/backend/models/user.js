// models/User.js
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    role: { type: String, enum: ['buyer', 'seller'], required: true }
});

module.exports = mongoose.model('User', UserSchema);
