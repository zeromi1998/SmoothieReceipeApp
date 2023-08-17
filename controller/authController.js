const User = require("../model/User");
const userAuthErrors = require("../utility/handleError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports.signUp_get = (req, res) => {
  res.render("signup");
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "this is Auth App", { expiresIn: maxAge });
};

module.exports.signUp_post = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = await User.create({ email, password, name });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    console.log(err);
    const errors = userAuthErrors(err);

    res.status(404).json({ errors });
  }
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.login_Post = async (req, res) => {
  const { email, password } = req.body;
  // const isValidJSON = obj => {
  //   try {
  //     JSON.parse(obj);
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // };
  // console.log("this req bosy 88888",email,password);
  // console.log(isValidJSON(req.body));

  try {
    const user = await User.findOne({ email});
  // console.log("this req bosy 88888",email,password,user);

    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id, name: user.name, token }); 
      } else {
        throw Error("Incorrect password");
      }
    } else {
      throw Error("Incorrect Email");
    }
  } catch (error) {
    const errors = userAuthErrors(error);
    res.status(400).send({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
