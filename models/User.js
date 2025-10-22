const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    ebook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ebook',
        required: true
    },
    content: {
        type: String,
        default: ''
    }
}, { timestamps: true }); 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    darkMode: {
        type: Boolean,
        default: false
    },
    bookmarks: {
        type: [{
            ebook: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ebook',
                required: true
            },
            page: {
                type: Number,
                default: 1
            }
        }],
        default: [] 
    },
    notes: [NoteSchema]
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);