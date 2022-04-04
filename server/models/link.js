const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const linkSchema = new mongoose.Schema({
    title:{
        type:String,
        trim: true,
        required: true,
        max: 256
    },
    url: {
        type:String,
        trim: true, 
        required: true,
        max: 256
    },
    description:{
        type:String, 
        required: true,
        max: 500
    }, 
    slug: {
        type:String,
        lowercase: true,
        required: true
    }, 
    categories: [{
        type: ObjectId,
        ref: 'Category',
        required: true
    }],
    type: {
        type: String,
        default: 'free'
    },
    medium: {
        type: String,
        default: 'video'
    },
    difficulty: {
        type: String,
        default: 'beginner'
    },
    clicks: {
        type: Number,
        default: 0
    },
    postedBy: {
        type: ObjectId,
        ref:'User'
    }
}, {timestamps: true})

module.exports = mongoose.model('Link', linkSchema)