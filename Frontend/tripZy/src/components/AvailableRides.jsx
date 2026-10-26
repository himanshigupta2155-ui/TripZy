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