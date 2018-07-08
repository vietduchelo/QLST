var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String
  },
  img: {
    type: String
  },
  status: {
    type: Number
  },
  gender: {
    type: String,
    required: true
  },
  birtday: {
    type: String
  },
  rate: {
    type: Number
  },
  spam: {
    type: Number
  },
  team: [{
    _id:String 
  }],
  updateAt: {
    type: String
  },
  createdDate: {
    type: Date,
    require: true
  }
});

var User = mongoose.model('user', userSchema);
module.exports = User;