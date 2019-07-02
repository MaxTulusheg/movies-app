const { Schema, model } = require('mongoose');


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  planned: [{
    type: Schema.Types.ObjectId,
    ref: 'Movie',
  }],
  watched: [{
    type: Schema.Types.ObjectId,
    ref: 'Movie',
  }],
  rated: [{
    type: Schema.Types.ObjectId,
    ref: 'Rate',
  }],
  birth_date: {
    type: Date,
    required: true,
  },
  register_date: {
    type: Date,
    required: true,
  },
});

const User = model('User', userSchema);

module.exports = User;
