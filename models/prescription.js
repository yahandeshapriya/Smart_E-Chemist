const mongoose = require('mongoose');

const prescriptionSchema = mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    patientAge: {
        type: Number,
        required: true
    },
    medications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medication',
        required:true
    }],
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },
    status: {
        type: String,
        required : true,
        default: 'Pending'
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },

})

exports.Prescription = mongoose.model('Prescription', prescriptionSchema);