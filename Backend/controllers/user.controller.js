import User from "../models/User.model.js";
import bcrypt from 'bcrypt'
import genToken from "../utils/genToken.js";
// const cookieOptions = {
//     httpOnly:true
// }
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
}
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {

        if (!name || !email || !password) {
            return res.status(422).json({ "success": false, message: "All fields are mandatory" });
        }
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(422).json({ message: "This email already exists" });
        }
        if (password.length <= 6) {
            return res.status(422).json({ "success": false, message: "Password must be greater than 6 characters" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await User.create({
            name, email, password: hashedPassword
        })
        const token = genToken(newUser._id);
        res.cookie("token", token, cookieOptions)

        return res.status(201).json({ "success": true, message: "User registered successfully", name, email });


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(422).json({ "success": false, message: "All fields are mandatory" });
        }
        const emailExists = await User.findOne({ email });
        if (!emailExists) {
            return res.status(401).json({ "success": false, message: "No such email exists" });
        }
        const correctPassword = await bcrypt.compareSync(password, emailExists.password);
        if (!correctPassword) {
            return res.status(401).json({ "success": false, message: "Please enter the correct password" });
        }
        const token = await genToken(emailExists._id);
        res.cookie("token", token, cookieOptions);
        return res.status(200).json({ "success": true, message: "Login successful" });


    } catch (error) {
        return res.status(500).json({ "success": false, message: "Internal server error" });
    }
}
export const getUser = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json({ "success": true, user });
    } catch (error) {
        return res.status(500).json({ "success": false, message: "Internal server error" });
    }
}
export const Logout = async (req, res) => {
    try {
        res.clearCookie("token", cookieOptions);
        return res.status(200).json({ "success": true, message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ "success": false, message: "Internal server error" });
    }
}