import express from'express'
import isAuthenticated from '../middlewares/auth.middleware.js';
import {registerUser,loginUser,getUser, Logout} from "../controllers/user.controller.js";
const userRoutes = express.Router()
userRoutes.post('/register',registerUser);
userRoutes.post('/login',loginUser);
userRoutes.get('/me',isAuthenticated,getUser);
userRoutes.post('/logout',Logout)
export default userRoutes