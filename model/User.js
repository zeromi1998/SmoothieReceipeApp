const mongoose = require("mongoose");
const { isEMail } = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter your email id"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter valid email id"],
  },
  password: {
    type: String,
    required: [true, "Please enter your Pasword"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  name: { type: String, required: true },
});

// mongoose hook :- before saving data to databse it will come inside this below method we will hash passsword
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();

  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
