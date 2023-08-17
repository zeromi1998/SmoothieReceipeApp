const express = require("express");
const smoothieRoute = express.Router();
const Smoothie = require("../model/Smoothie");
const smoothieController = require("../controller/smoothieController");
let multer = require("multer");
const {
  checkUserAuthenticated,
  checkUser,
} = require("../middleware/authMiddleware");

const Dir = "public";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, Dir);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

smoothieRoute.post(
  "/smoothieImg/upload",
  upload.single("smoothieImg"),
  checkUserAuthenticated,
  smoothieController.upload_smoothiesImg
);



smoothieRoute.get(
  "/smoothies",
  checkUserAuthenticated,
  smoothieController.get_smoothies
);

smoothieRoute.get(
  "/smoothie",
  checkUserAuthenticated,
  smoothieController.get_smoothie
);

smoothieRoute.post(
  "/smoothie",
  upload.single("smoothieImg"),
  checkUserAuthenticated,
  smoothieController.post_smoothies
);

smoothieRoute.patch(
  "/smoothie/:id",
  upload.single("smoothieImg"),
  checkUserAuthenticated,
  smoothieController.edit_smoothie
);

smoothieRoute.delete(
  "/smoothie/:id",
  checkUserAuthenticated,
  smoothieController.delete_smoothie
);

module.exports = smoothieRoute;
