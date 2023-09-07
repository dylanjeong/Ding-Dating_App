const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birthday: {
    type: Number,
  },
  birthmonth: {
    type: Number,
  },
  birthyear: {
    type: Number,
  },
  gender: {
    type: String,
  },
  gender_interest: {
    type: String,
  },
  about: {
    type: String
  },
  matches: {
    type: Array
  },
  img_url: {
    type: String,
  },
})

module.exports = mongoose.model("users", userSchema)