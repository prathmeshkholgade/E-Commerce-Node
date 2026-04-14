const { user } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/helper");
module.exports.signUpUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    const existingUser = await user.findOne({
        where: {
            email: email
        }
    });

    if (existingUser) {
        return res.json({ message: "user already exist with this email", status: 200 })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
        fullName,
        email,
        password: hashedPassword
    });

    const token = await generateToken(newUser.id);
    return res.json({
        message: "user register successfully",
        token: token,
        user: {
            name: newUser.fullName,
            email: newUser.email
        }
    });

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

    res.json({
        message: "user log in successfully", status: 200, token, user: {
            fullName: existingUser.fullName,
            email: existingUser.email,
        }
    })



}