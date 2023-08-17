const mongoose = require("mongoose");

const smoothieSchema = new mongoose.Schema({
  smoothieImg: {
    type: String,
  },
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
  author: {
    userId: { type: String, require: true },
    name: { type: String, require: true },
  },
});

const smoothie = mongoose.model("Smoothie", smoothieSchema);

module.exports = smoothie;
