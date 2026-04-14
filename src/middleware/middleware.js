const { signupSchema, loginSchema, reviewSchema } = require("../utils/validations")

const jwt = require("jsonwebtoken");
const verifyUser = (req, res, next) => {
    try {
        let token = req.cookies?.token || req.headers.authorization;

        if (token && token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token provided",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        next(error)
    }
};


const validateUserSignUp = (req, res, next) => {

    const { error, value } = signupSchema.validate(req.body, { abortEarly: true });

    if (error) {
        res.json({
            message: error.details[0].message,
            status: 400
        })
    }

    req.body = value
    next()
}

const validateLogin = (req, res, next) => {

    const { error, value } = loginSchema.validate(req.body, { abortEarly: true });

    if (error) {
        res.json({
            message: error.details[0].message,
            status: 400
        })
    }

    req.body = value
    next()
}

const validateReview = (req, res, next) => {

    const { error, value } = reviewSchema.validate(req.body, { abortEarly: true });

    if (error) {
        res.json({
            message: error.details[0].message,
            status: 400
        })
    }

    req.body = value
    next()
}

module.exports = { validateLogin, validateUserSignUp, verifyUser, validateReview }