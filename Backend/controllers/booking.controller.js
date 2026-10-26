import Ride from "../models/Ride.model.js";
// import User from "../models/User.model.js";
import Booking from "../models/Booking.model.js";
export const createBooking = async (req, res) => {
    const { rideId, seatsBooked } = req.body;
    try {
        if (!rideId || !seatsBooked) {
            return res.status(422).json({ "success": false, message: "These fields are required" });
        }
        if (!Number.isInteger(seatsBooked) || seatsBooked <= 0) {
            return res.status(400).json({ "success": false, message: "Invalid request" });
        }
        const ride = await Ride.findById(rideId);
        if (!ride) {
            return res.status(404).json({ "success": false, message: "No ride found" });
        }
        if (ride.driver.equals(req.user._id)) {
            return res.status(403).json({
                message: "You cannot book your own ride"
            });
        }
        const existingBooking = await Booking.findOne({
            passenger: req.user._id,
            ride: rideId,
            bookingStatus: "pending"
        });

        if (existingBooking) {
            return res.status(400).json({
                message: "You already have a pending booking for this ride"
            });
        }
        if (ride.rideStatus !== "active") {
            return res.status(400).json({ "success": false, message: "This ride is not available for booking" })
        }
        if (ride.availableSeats < seatsBooked) {
            return res.status(400).json({ "success": false, message: "These many seats are not available" });
        }
        const newBooking = await Booking.create({
            passenger: req.user._id,
            ride: rideId,
            seatsBooked: seatsBooked,

        })
        // ride.availableSeats -= seatsBooked;
        // await newBooking.save();
        // await ride.save();
        return res.status(201).json({ "success": true, message: "Booking created successfully", newBooking });

    }
    catch (error) {
        console.error("Create booking error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const getMyBookings = async (req, res) => {
    try {
        const myBookings = await Booking.find({ passenger: req.user._id }).populate('ride');
        return res.status(200).json({ "success": true, myBookings })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
export const getDriverRequests = async (req, res) => {
    try {
        const myRides = await Ride.find({
            driver: req.user._id
        });

        const rideIds = myRides.map(ride => ride._id);

        const requests = await Booking.find({
            ride: { $in: rideIds }
        })
            .populate("ride")
            .populate("passenger", "name email");

        return res.status(200).json({
            success: true,
            requests
        });
    } catch (error) {
        console.error("Get driver requests error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
export const acceptBooking = async (req, res) => {
    const { bookingId } = req.params;
    try {
        console.log("acceptBooking called");
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ success: false, message: "No booking found" });
        }
        const ride = await Ride.findById(booking.ride);
        if (!ride) {
            return res.status(404).json({ success: false, message: "No ride found" });
        }
        console.log("Ride driver ID:", ride.driver.toString());
        console.log("Logged-in user ID:", req.user._id.toString());
        if (!ride.driver.equals(req.user._id)) {
            return res.status(403).json({ success: false, message: "Only ride driver can accept this booking" });
        }
        if (booking.bookingStatus !== "pending") {
            return res.status(400).json({ success: false, message: "Only pending requests can be accepted" });
        }
        if (ride.rideStatus !== "active" ||
            ride.availableSeats < booking.seatsBooked
        ) {
            return res.status(400).json({ success: false, message: "Rides unavailbale or insufficient seats" });
        }
        ride.availableSeats -= booking.seatsBooked;
        booking.bookingStatus = "accepted";
        await ride.save();
        await booking.save();
        return res.status(200).json({ success: true, message: "Booking accepted", booking })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const rejectBooking = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }
        const ride = await Ride.findById(booking.ride);
        if (!ride) {
            return res.status(404).json({ success: false, message: "Ride not found" });
        }
        if (!ride.driver.equals(req.user._id)) {
            return res.status(403).json({ success: false, message: "Only ride driver can reject this booking" });
        }
        if (booking.bookingStatus !== "pending") {
            return res.status(400).json({ success: false, message: "Only pending requests can be rejected" });
        }
        booking.bookingStatus = "rejected";
        await booking.save();
        return res.status(200).json({ success: true, message: "Booking rejected", booking });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const cancelBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ "success": false, message: "No booking is found with this id" });
        }
        if (!booking.passenger.equals(req.user._id)) {
            return res.status(403).json({ "success": false, message: "You are not allowed to cancel this booking" });
        }
        if (booking.bookingStatus === "cancelled") {
            return res.status(400).json({ "success": false, message: "Booking is already cancelled" });
        }

        const ride = await Ride.findById(booking.ride);
        if (!ride) {
            return res.status(404).json({ "success": false, message: "This ride is not found" });
        }
        if (booking.bookingStatus === "accepted") {
            ride.availableSeats += booking.seatsBooked;
        }
        booking.bookingStatus = "cancelled";
        await ride.save();
        await booking.save();
        return res.status(200).json({ "success": true, message: "Booking cancelled successfully" });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};