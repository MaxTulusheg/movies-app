const { Schema, model } = require('mongoose');


const genreSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  birth_date: {
    type: Date,
    required: true,
  },
});

const Genre = model('Actor', genreSchema);

module.exports = Genre;
