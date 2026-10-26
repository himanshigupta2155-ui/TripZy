import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema({
    passenger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    ride: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ride',
        required: true,
    },
    seatsBooked: {
        type: Number,
        required: true,
        min: 1,
    },
    bookingStatus: {
        type: String,
        enum: ["pending", "accepted", "rejected", "cancelled"],
        default: "pending",

    }

},
    { timestamps: true }
)
const Booking = mongoose.model('booking', bookingSchema);
export default Booking;