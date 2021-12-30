const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String
    },
    genre: {
        type: String
    },
    authorId: {
        type: String
    }
})

module.exports = mongoose.model('books', bookSchema);