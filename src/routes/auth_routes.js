
const express = require("express");
const router = express.Router();

const { signUpUser, logIn } = require("../controllers/auth_controller");
const { validateLogin, validateUserSignUp } = require("../middleware/middleware");
const { asyncWrap } = require("../utils/async_wrap");




router.post("/signup", validateUserSignUp, asyncWrap(signUpUser));
router.post("/login", validateLogin, asyncWrap(logIn));

module.exports = router;