const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 2,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    genre: {
        type: String,
        minLength: 2,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        minLength: 2,
        trim: true,
    },
    publicationYear: {
        type: Number,
        min: 0,
        max: 9999,
    },
    pageCount: {
        type: Number,
        min: 1,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;