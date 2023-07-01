const express = require("express");
const smoothieRoute = express.Router();
const Smoothie = require("../model/Smoothie")
const smoothieController =  require("../controller/smoothieController")
const {
  checkUserAuthenticated,
  checkUser,
} = require("../middleware/authMiddleware");


smoothieRoute.get("/smoothies",checkUserAuthenticated, smoothieController.get_smoothies);

smoothieRoute.get("/smoothie",checkUserAuthenticated, smoothieController.get_smoothie);

smoothieRoute.post("/smoothie",checkUserAuthenticated,smoothieController.post_smoothies)

smoothieRoute.patch("/smoothie/:id",checkUserAuthenticated,smoothieController.edit_smoothie)

smoothieRoute.delete("/smoothie/:id",checkUserAuthenticated,smoothieController.delete_smoothie)


module.exports = smoothieRoute;
