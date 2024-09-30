const Users = require('../Model/userAuth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const confirmUser = async (req, res) => {
    try {
        const { otp, email } = req.body;
        if (!otp || !email) {
            return res.json({
                success: false,
                msg: "Not a Valid input"
            })
        }
        const response = await Users.findOne({ email });
        if (!response) {
            return res.status(401).json({
                success: false,
                msg: "User is Not Available"
            })
        }
        if (otp == response.verificationToken) {
            response.verificationToken = undefined;
            response.verificationTokenExpiresAt = undefined;
            response.isVerified = true;

            await response.save();
            return res.status(200).json({
                success: true,
                msg: "User Varified"
            })
        }
        else {
            return res.status(400).json({
                success: false,
                msg: "Otp is Invalid"
            })
        }
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            msg: "Something is Wrong" + e,
        })
    }
}

module.exports = { confirmUser };