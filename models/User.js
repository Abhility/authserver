const mongoose = require('mongoose');

const User = mongoose.Schema({
  userName: {
    type: 'String',
    require: true,
    unique: true,
    min: 4,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    min: 10,
  },
  password: {
    type: String,
    require: true,
    max: 2048,
  },
  isExpired: {
    type: Boolean,
    require: true,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    require: true,
    default: false,
  },
  isMentor: {
    type: Boolean,
    require: true,
    default: false,
  },
});

module.exports = mongoose.model('user', User, 'users');
