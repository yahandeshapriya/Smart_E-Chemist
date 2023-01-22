const mongoose = require('mongoose')

const drugSchema = mongoose.Schema({
    generic_name: {
        type: String,
        required: true,
        capitalize: true
    },
    brand_name: {
        type: String,
        required: true,
    },
    dosage_form: {
        type: String,
        enum: ['tablet' ,
                'capsule',
                'pills',
                'lozenges',
                'powder(oral)',
                'syrup',
                'oral_drops',
                'mouthwashes',
                'creams',
                'gels',
                'sprays',
                'suppository',
                'injection',
                'inhaler'
        ],
        required: true
    },
    manufacturer : {
        type: String,
        default: 'N/A'
    }
    
})

exports.Drug = mongoose.model('Drug', drugSchema);
exports.drugSchema = drugSchema;