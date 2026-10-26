import express from 'express'
import isAuthenticated from '../middlewares/auth.middleware.js';
import { createBooking, getMyBookings, cancelBooking, getDriverRequests, acceptBooking, rejectBooking } from '../controllers/booking.controller.js';
const bookingRoutes = express.Router();
bookingRoutes.post('/create', isAuthenticated, createBooking);
bookingRoutes.get('/get', isAuthenticated, getMyBookings);
bookingRoutes.patch('/:bookingId/cancel', isAuthenticated, cancelBooking)
bookingRoutes.patch('/:bookingId/accept', isAuthenticated, acceptBooking)
bookingRoutes.patch('/:bookingId/reject', isAuthenticated, rejectBooking)
bookingRoutes.get('/driver-requests',isAuthenticated,getDriverRequests);
export default bookingRoutes;