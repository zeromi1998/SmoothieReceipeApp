const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cors = require('cors');
const smoothieRoute  = require("./routes/smoothieRoutes")
const {
  checkUserAuthenticated,
  checkUser,
} = require("./middleware/authMiddleware");
const CookieParser = require("cookie-parser");
const app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));



// middleware
app.use('/public',express.static("public"));
app.use(express.json());
app.use(CookieParser());
app.use(cors());

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

