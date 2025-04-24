const express = require("express");
const router = express.Router();
const authController = require("../controller/AuthController");

// Signup route
router.post("/signup", authController.signup);

// Login route
router.post("/login", authController.login);

// Dashboard route
router.get("/dashboard", authController.dashboard);

module.exports = router;
