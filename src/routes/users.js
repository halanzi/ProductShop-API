// Dependancies
const express = require("express");
const router = express.Router();

// Controllers
const { signup, signin } = require("../controllers/userController");

// Sign up "register"
router.post("/signup", signup);

// Sign in "register"
router.post("/signin", signin);

module.exports = router;
