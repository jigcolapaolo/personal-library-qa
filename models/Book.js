const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    commentcount: {
        type: Number,
        default: 0
    },
    comments: {
        type: [String],
        default: []
    }
})

module.exports = mongoose.model('Book', bookSchema)