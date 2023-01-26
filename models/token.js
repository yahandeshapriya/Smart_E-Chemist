const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    doctor_id : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true
    },
    token: {
      type: String,
      required: true
    }
    
})


exports.Token = mongoose.model('Token', tokenSchema);
exports.tokenSchema = tokenSchema;