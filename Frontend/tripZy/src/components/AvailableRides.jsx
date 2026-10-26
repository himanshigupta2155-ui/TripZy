import React from 'react'
import axiosInstance from './axiosCalls/axios'
import { useState, useEffect } from 'react'
import RideCard from './RideCard'
function AvailableRides() {
  const [rides, setRides] = useState([])
  const [bookingError, setBookingError] = useState('')
  useEffect(() => {
    const availableRides = async (e) => {
      try {
        const res = await axiosInstance.get('/rides/getAll')
        setRides(res.data.allRides)
      } catch (error) {
        console.log(error.response?.data?.message)
      }
    }
    availableRides()
  }, [])
  const handleBookRide = async (rideId) => {
    try {
      setBookingError('')
      const res = await axiosInstance.post('/bookings/create', {
        rideId, seatsBooked: 1,

      })
      // console.log(res.data.message);
      await axiosInstance.get('/rides/getAll').then((res) => {
        setRides(res.data.allRides);
      });
      alert('Ride booked successfully!');
    } catch (error) {
      setBookingError(error.response?.data?.message || "Something went wrong")
      console.log(error.response?.data.message || "Something went wrong")
    }
  }
  return (
    // <div>
    //   <h1>Available Rides</h1>
    //   {rides.map((ride)=>(
    //     <div key={ride._id}>
    //       <p>{ride.source}</p>
    //       <p>{ride.destination}</p>
    //       <p>{ride.date}</p>
    //       <p>{ride.departureTime}</p>
    //       <p>{ride.availableSeats}</p>
    //       <p>{ride.pricePerSeat}</p>
    //       <button onClick={()=>handleBookRide(ride._id)}>Book Ride</button>
    //     </div>

    //   ))}
    // </div>

    <div className="min-h-screen bg-[#FAF7EF] px-6 py-12 text-emerald-950">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Your next journey
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Available Rides
          </h1>
          <p className="mt-3 text-stone-600">
            Find your route, choose your ride, and get moving.
          </p>
        </div>
        {bookingError && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {bookingError}
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2">
          {/* {rides.map((ride) => (
            <div
              key={ride._id}
              className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800">
                  Active ride
                </span>
                <span className="text-2xl">🚗</span>
              </div>

              <div className="my-6 flex items-center gap-3">
                <div className="flex flex-1 items-center gap-3">
                  <span className="h-3 w-3 shrink-0 rounded-full bg-emerald-600" />
                  <p className="break-words text-lg font-bold">{ride.source}</p>
                </div>
                <span className="text-xl text-emerald-600">→</span>
                <div className="flex flex-1 items-center gap-3">
                  <span className="h-3 w-3 shrink-0 rounded-full bg-amber-500" />
                  <p className="break-words text-lg font-bold">{ride.destination}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 rounded-xl bg-[#FAF7EF] p-4">
                <div>
                  <p className="text-sm text-stone-500">Date</p>
                  <p className="mt-1 font-semibold">{ride.date}</p>
                </div>
                <div>
                  <p className="text-sm text-stone-500">Departure</p>
                  <p className="mt-1 font-semibold">{ride.departureTime}</p>
                </div>
                <div>
                  <p className="text-sm text-stone-500">Seats available</p>
                  <p className="mt-1 font-semibold">{ride.availableSeats}</p>
                </div>
                <div>
                  <p className="text-sm text-stone-500">Price per seat</p>
                  <p className="mt-1 text-xl font-extrabold text-emerald-800">
                    ₹{ride.pricePerSeat}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleBookRide(ride._id)}
                disabled={ride.availableSeats < 1}
                className="mt-5 w-full rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {ride.availableSeats < 1 ? 'Fully Booked' : 'Book Ride →'}
              </button>
            </div>
          ))} */}
          {rides.map((ride) => (
            <RideCard
              key={ride._id}
              ride={ride}
              onBook={handleBookRide}
            />
          ))}
        </div>

        {rides.length === 0 && (
          <div className="rounded-2xl border border-dashed border-emerald-900/20 bg-white/70 px-6 py-16 text-center">
            <div className="text-5xl">🛣️</div>
            <h2 className="mt-4 text-xl font-bold">No rides available yet</h2>
            <p className="mt-2 text-stone-600">
              Check back soon for your next journey.
            </p>
          </div>
        )}

      </div>
    </div>

  )
}

export default AvailableRides