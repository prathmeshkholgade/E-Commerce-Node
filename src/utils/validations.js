
const Joi = require("joi");

const signupSchema = Joi.object({
    fullName: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.empty": "Full name is required",
            "string.min": "Full name must be at least 3 characters",
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Invalid email format",
            "string.empty": "Email is required",
        }),

    password: Joi.string()
        .min(6)
        .max(20)
        .required()
        .messages({
            "string.min": "Password must be at least 6 characters",
            "string.empty": "Password is required",
        }),
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Invalid email format",
            "string.empty": "Email is required",
        }),

    password: Joi.string()
        .required()
        .messages({
            "string.empty": "Password is required",
        }),
});


const createProductSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.empty": "Product name is required",
        }),

    price: Joi.string()
        .required()
        .messages({
            "string.empty": "Price is required",
        }),

    image: Joi.string()
        .uri()
        .optional()
        .allow(null, ""),

    description: Joi.string()
        .min(5)
        .required()
        .messages({
            "string.empty": "Description is required",
        }),


});

const updateProductSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    price: Joi.string().optional(),
    image: Joi.string()
        .uri()
        .optional()
        .allow(null, ""),
    description: Joi.string().min(5).optional(),
});

const reviewSchema = Joi.object({
    rating: Joi.string().min(0).max(5).required(),
    comment: Joi.string().min(3).max(255).required(),
});
module.exports = { signupSchema, loginSchema, createProductSchema, updateProductSchema, reviewSchema }