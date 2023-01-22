const mongoose = require('mongoose')

const doctorSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: [true, "email already exists in database!"],
        lowercase: true,
        trim: true,
        required: true,
        validate: {
        validator: function (v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
         },
        message: '{VALUE} is not a valid email!'
        }
    },
    mobile: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ''
    },
    slmcRegNo: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    // degrees: [{
    //     type: Array,
    //     required: true
    // }],
    hospital: {
        type: String,
        required: true
    },
    slmcDocument: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: [true, "username already exists"],
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isProfileVerified: {
        type: Boolean,
        default: false
    },
    profilePic: {
        type: String,
        default: ''
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
})

exports.Doctor = mongoose.model('Doctor', doctorSchema)
exports.doctorSchema = doctorSchema