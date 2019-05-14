const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  profile_avatar:{
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  create_profile : {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now
  }
});
UserSchema.index({name: 'text', email: 'text'});

module.exports = User = mongoose.model('users', UserSchema);
