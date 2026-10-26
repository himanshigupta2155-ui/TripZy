import mongoose from 'mongoose';
const rideSchema = new mongoose.Schema({
    driver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    source:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    departureTime:{
        type:String,
        required:true,
    },
    availableSeats:{
        type:Number,
        required:true,
        min:0,
    },
    pricePerSeat:{
        type:Number,
        required:true,
        min:0
    },
    rideStatus:{
        type:String,
        enum:["active","completed","cancelled"],
        default:"active"


    }

},
{timestamps:true}
)
const Ride = mongoose.model('ride',rideSchema);
export default Ride;