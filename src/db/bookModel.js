const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Book = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      default: uuidv4,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      required: true
    }
  }
);


module.exports = mongoose.model('Book', Book);
