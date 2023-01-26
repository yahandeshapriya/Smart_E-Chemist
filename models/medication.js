const mongoose = require('mongoose');

const medicationSchema = mongoose.Schema({

  medication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Drug'
  },
  amount: {
    type: String,
    required: true
  },
  route: {
    type: String,
    enum: ['PO', 'PR', 'IM', 'IV', 'ID', 'IN', 'IP', 'SL', 'BUCC', 'IP'],
    required: true
  },
  frequency: {
    type: String,
    enum: ['daily', 'every other day', 'BID', 'TID', 'QID', 'QHS', 'Q4h', 'Q4-6h', 'QWK'],
    required: true
  },
  prn: {
    type: String,
    default: 'N/A'
  },
  howMuch: {
    type: String,
    required: true
  },
  refills: {
    type: Number,
    default: 0
  }
    
})

exports.Medication = mongoose.model('Medication', medicationSchema);