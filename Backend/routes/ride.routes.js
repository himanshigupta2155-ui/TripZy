import express from 'express'
import isAuthenticated from '../middlewares/auth.middleware.js';
import { cancelRide, createRide, getAllRides, getRide, updateRide } from '../controllers/ride.controller.js';
const rideRoutes = express.Router();
rideRoutes.post('/create',isAuthenticated,createRide);
rideRoutes.get('/getAll',isAuthenticated,getAllRides);
rideRoutes.get('/get/:rideId',isAuthenticated,getRide)
rideRoutes.patch('/update/:rideId',isAuthenticated,updateRide)
rideRoutes.patch('/:rideId/cancel',isAuthenticated,cancelRide)
export default rideRoutes