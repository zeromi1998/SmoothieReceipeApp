const { Router } = require("express");
const authController = require("../controller/authController")

const authRoutes = Router();

authRoutes.get("/signup", authController.signUp_get);

authRoutes.get("/login", authController.login_get);

authRoutes.post("/signup", authController.signUp_post);

authRoutes.post("/login", authController.login_Post);

authRoutes.get("/logout", authController.logout_get);

module.exports = authRoutes;
