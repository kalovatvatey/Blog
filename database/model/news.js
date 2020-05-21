const mongoose = require('mongoose')

const NewsSchema = new mongoose.Schema({
    author: {
        type: String,
        required: [true, 'Author field is Empty']
    },
    createdAt: {
        type: Date,
        default: Date()
    },
    email: {
        type: String,
        required: [true, 'Email field is Empty']
    },
    title: {
        type: String,
        required: [true, 'Title field is Empty']
    },
    subtitle: {
        type: String,
        required: [true, 'Subtitle field is Empty']
    },
    city: {
        type: String,
        required: [true, 'City field is Empty']
    },
    image:{
        type: String,
        required: [true, 'Image field is Empty']
    },
    news: {
        type: String,
        required: [true, 'News field is Empty']
    }
})

module.exports = mongoose.model('News', NewsSchema)