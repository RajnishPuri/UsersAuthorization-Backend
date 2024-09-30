const Users = require('../Model/userAuth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signUp = async (req, res) => {
    try {
        const { email, password, name, role } = req.body;

        if (!email || !password || !name || !role) {
            return res.status(400).json({
                success: false,
                message: "Fill all the required fields"
            });
        }

        const response = await Users.findOne({ email });
        if (response) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new Users({
            email,
            password: hashedPassword,
            role,
            name,
            verificationToken
        });

        const Token = jwt.sign({ role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Add payload

        res.cookie("Token", Token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        await user.save();

        res.status(201).json({
            success: true,
            msg: "User created successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { signUp };
