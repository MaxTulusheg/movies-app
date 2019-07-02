const { Schema, model } = require('mongoose');


const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  genres: [{
    type: Schema.Types.ObjectId,
    ref: 'Genre',
    required: true,
  }],
  actors: [{
    type: Schema.Types.ObjectId,
    ref: 'Actor',
    required: true,
  }],
  rating: [{
    type: Number,
    default: 0,
  }],
  runtime: {
    type: Number,
    required: true,
    min: 1,
  },
  release: {
    type: Date,
    required: true,
  },
  age_restriction: {
    type: Number,
    required: true,
  },
  trailer: String,
  comments: [{
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: Date,
    message: String,
  }],
});

const Movie = model('Movie', movieSchema);

module.exports = Movie;
