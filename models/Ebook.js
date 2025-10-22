const mongoose =require('mongoose')

const EbookSchema=new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        default: ''
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    tags: {
        type: [String],
        default: []
    },
    content: {
        onlineUrl: { type: String, required: true }, // online version link
        offlineFile: { type: String } // optional offline file path
    },
    numberOfPages: {
        type: Number,
        required: true,
        min: 1
    }
}, {timestamps: true});

module.exports=mongoose.model('Ebook', EbookSchema);