const jwt = require("jsonwebtoken");
const User = require("../model/User");

const checkUserAuthenticated = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (authToken) {
    const token = authToken.split(" ")[1];
    console.log("this is post smoothie", token);

    jwt.verify(token, "this is Auth App", (err, decodedToken) => {
      if (err) {
        // thhis check is for if someone modify the token
        res.status(403).json({ err });
      } else {
        console.log("this is verify token", decodedToken);
        req.user = decodedToken
        next();
      }
    });
  } else {
    console.log("this is post smoothie else");

    res.status(401).json("Unauthorized User");
  }
};

// check current user

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "this is Auth App", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { checkUserAuthenticated, checkUser };
