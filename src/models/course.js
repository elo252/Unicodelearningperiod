const mongoose = require('mongoose')

const courseSchema =  new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    descr: {
        type: String,
        unique: true,
        required: true
        
    },

    duration: {
        type: String,
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course