const Users = require('../Model/userAuth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                success: false,
                msg: "All Fields are required"
            })
        }
        const response = await Users.findOne({ email });
        if (!response) {
            return res.json({
                success: false,
                msg: "No Such User Exists"
            })
        }
        const userEmail = response.email;
        const userPassword = await bcrypt.compare(password, response.password);
        if (!userPassword) {
            return res.json({
                success: false,
                msg: "Password is Incorrect"
            })
        }
        const Token = await jwt.sign({ userId: response._id, role: response.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        if (!Token) {
            return res.json({
                success: false,
                msg: "Token is Empty"
            })
        }
        res.cookie("Token", Token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        console.log(Token);

        res.status(200).json({
            success: true,
            msg: "Successfully Logged in",
            Token
        })
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = { login }