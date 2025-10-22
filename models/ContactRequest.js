const mongoose = require('mongoose');

const ContactRequestSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        trim: true 
    },
    subject: { 
        type: String, 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    }
}, {timestamps: true});

module.exports = mongoose.model('ContactRequest', ContactRequestSchema);