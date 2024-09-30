const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    email: {
        type: String,
        isUnique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Admin", "Student", "Teacher"]
    },
    name: {
        type: String,
        require: true,
        maxlength: 50,
        trim: true
    },
    lastLogin: {
        type: Date,
        default: Date.now()
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date
}, { timestamps: true });

module.exports = mongoose.model("Users", userModel);