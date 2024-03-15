
const mongoose = require('mongoose');
const plm =require("passport-local-mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/appUser")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "post"
  }],
  dp: {
    type: String,
    default:"350fd475-9acd-4884-8b03-296bea7a8d72.avif"
  },
  email: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  }
})

userSchema.plugin(plm);

module.exports = mongoose.model('users', userSchema);