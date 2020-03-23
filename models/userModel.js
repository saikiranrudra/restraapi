const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "User name is required"]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        require: [true, "User email is required"],
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    position: {
        type: String,
        enum: ['customer', 'reception', 'cook', 'manager'],
        default: 'customer'
    },
    dateOfBirth: {
        type: Date
    },
    dateOfRegistration: {
        type: Date,
        default: Date.now()
    }   
});

module.exports = mongoose.model('Users', userSchema);