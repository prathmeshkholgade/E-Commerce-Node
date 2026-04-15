
const express = require("express");
const router = express.Router();

const { signUpUser, logIn } = require("../controllers/auth_controller");
const { validateLogin, validateUserSignUp } = require("../middleware/middleware");
const { asyncWrap } = require("../utils/async_wrap");
const { verifyOTP, sendOTP } = require("../service/otp_service");



router.get("/login", (req, res) => {

    return res.render("auth/login_screen.ejs")
})

router.get("/signup", (req, res) => {
    return res.render("auth/signup_screen.ejs")
});



// router.post("/send-otp", async (req, res) => {
//     const { mobile } = req.body;
//     const result = await sendOTP(mobile);
//     res.json(result);
// });


router.post("/verify-otp", async (req, res) => {
    const { mobile, otp } = req.body;
    const result = await verifyOTP(mobile, otp);
    res.json(result);
});

router.post("/signup", validateUserSignUp, asyncWrap(signUpUser));
router.post("/login", validateLogin, asyncWrap(logIn));

module.exports = router; 