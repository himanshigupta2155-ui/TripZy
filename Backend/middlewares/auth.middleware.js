import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
const isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(404).json({message:"No token found"});
        }
        const decoded = jwt.verify(token,process.env.jwt_secret);
        const user = await User.findById(decoded.userId);
        if(!user){
             return res.status(404).json({message:"No user found"});
        }
        req.user=user;
        next();
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}
export default isAuthenticated;