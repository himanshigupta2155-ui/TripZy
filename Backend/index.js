import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from'cors'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import rideRoutes from './routes/ride.routes.js'
import bookingRoutes from './routes/booking.routes.js'
const app = express()
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
mongoose.connect(process.env.dbUrl).then(() => {
    console.log("DB connected");
}).catch((error) => {
    console.log(error);
})
app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send("Welcome to tripZy");
})
app.use('/users',userRoutes)
app.use('/rides',rideRoutes)
app.use('/bookings',bookingRoutes)
app.listen(8008, (req, res) => {
    console.log("Server started at 8008");
})