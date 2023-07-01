const mongoose = require("mongoose");

const smoothieSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    lowercase: true,
    unique: true,
  },
  ingredients: {
    type: String,
    require: true,
    lowercase: true,
  },
  description: {
    type: String,
    require: true,
  },
  auther: {
    userId: { type: String, require: true },
    name: { type: String, require: true },
  },
});

const smoothie = mongoose.model("Smoothie", smoothieSchema);

module.exports = smoothie;
