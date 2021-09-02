const mongoose = require('mongoose')

const courseSchema =  new mongoose.Schema({
    name: {
        type: String,
        unique:  [true, 'Sorry, enter another Name, as already taken'],
        required: true,
        trim: true
    },

    descr: {
        type: String,
        unique:  [true, 'Sorry, enter another Description, as already taken'],
        required: true
        
    },

    duration: {
        type: String,
        required: [true, 'Duration']
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Owner'],
        ref: 'User'
    }
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course