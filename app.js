const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const smoothieRoute  = require("./routes/smoothieRoutes")
const {
  checkUserAuthenticated,
  checkUser,
} = require("./middleware/authMiddleware");
const CookieParser = require("cookie-parser");
const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(CookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://auth98:root@cluster0.amdgzde.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
// app.get("/smoothies", checkUserAuthenticated, (req, res) =>
//   res.render("smoothies")
// );
app.use(authRoutes);
app.use(smoothieRoute);

