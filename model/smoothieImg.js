const mongoose = require("mongoose");

const smoothieImgSchema = new mongoose.Schema({
  smoothieImg: {
    type: String,
  },
});

const smoothieImgS = mongoose.model("SmoothieImg", smoothieImgSchema);

module.exports = smoothieImgS;
