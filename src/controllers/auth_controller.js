const { user } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const { generateToken } = require("../utils/helper");

module.exports.signUpUser = async (req, res) => {
    console.log(req.body);
    const { fullName, email, password, phone } = req.body;

    const existingUser = await user.findOne({
        where: {
            email: email
        }
    });

    if (existingUser) {
        return res.json({ message: "user already exist with this email", status: 200 })
    }
    console.log(phone);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
        fullName,
        email,
        password: hashedPassword,
        phone
    });

    const token = generateToken(newUser.id);
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",

    })

    return res.redirect("/product")

    // return res.json({
    //     message: "user register successfully",
    //     token: token,
    //     user: {
    //         name: newUser.fullName,
    //         email: newUser.email
    //     }
    // });

}

module.exports.logIn = async (req, res) => {

    const { email, password } = req.body;
    const existingUser = await user.findOne({
        where: {
            email: email
        }
    })
    if (!existingUser) {
        return res.json({ messsage: "user not found with this email", status: 400 })
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) res.json({ message: "invalid credentials", status: 500 });
    const token = generateToken(existingUser.id);

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",

    })

    return res.redirect("/product")

}

