import Ride from "../models/Ride.model.js";
// import rideRoutes from "../routes/ride.routes.js";
export const createRide = async (req, res) => {
    const { source, destination, date, departureTime, availableSeats, pricePerSeat } = req.body;
    try {
        if (!source?.trim() || !destination?.trim() || !date || !departureTime || availableSeats === undefined || pricePerSeat === undefined) {
            return res.status(422).json({ "success": false, message: "All fields are mandatory" });
        }
        const newRide = await Ride.create({
            source: source?.trim(),
            destination: destination?.trim(),
            date,
            departureTime,
            availableSeats,
            pricePerSeat,
            driver: req.user._id,

        })
        return res.status(201).json({ "success": true, message: "Ride created successfully", newRide });
    }
    catch (error) {
        console.error("Create ride error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export const getAllRides = async (req, res) => {
    try {
        const allRides = await Ride.find({ rideStatus: "active" });
        return res.status(200).json({ "success": true, allRides });

    } catch (error) {
        return res.status(500).json({ "success": false, message: "Internal server error" });
    }
}
export const getRide = async (req, res) => {
    const { rideId } = req.params;
    try {
        const getById = await Ride.findById(rideId);
        if (!getById) {
            return res.status(404).json({ "success": false, message: "No ride with this id found" });
        }
        return res.status(200).json({ "success": true, getById });
    } catch (error) {
        return res.status(500).json({ "success": false, message: "Internal server error" });
    }
}
export const updateRide = async (req, res) => {
    const { rideId } = req.params;
    const { source, destination, date, departureTime, availableSeats, pricePerSeat } = req.body;

    try {
        const ride = await Ride.findById(rideId);
        if (!ride) {
            return res.status(404).json({ "success": false, message: "No ride found" });
        }
        if (!ride.driver.equals(req.user._id)) {
            return res.status(403).json({ "success": false, message: "You are not allowed to modify this ride" });
        }
        const findRide = await Ride.findByIdAndUpdate(rideId, {
            source,
            destination,
            date, departureTime, availableSeats, pricePerSeat
        },
            { new: true }
        )
        if (!findRide) {
            return res.status(404).json({ "success": false, message: "No ride found with this id" });
        }
        return res.status(200).json({ "success": true, message: "Ride updated successfully", findRide });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
export const cancelRide = async (req, res) => {
    const { rideId } = req.params;
    try {
        const ride = await Ride.findById(rideId);
        if (!ride) {
            return res.status(404).json({ "success": false, message: "No ride is found with this id" });
        }
        if (!ride.driver.equals(req.user._id)) {
            return res.status(403).json({ "success": false, message: "You are not allowed to  cancel this ride" });
        }
        // const rideToCancel = await Ride.findByIdAndDelete(rideId);
        ride.rideStatus = "cancelled"
        await ride.save();
        return res.status(200).json({ "success": true, message: "Ride cancelled successfully" });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}