import React, { useEffect, useState } from 'react'
import axiosInstance from './axiosCalls/axios'
function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  // const[message,setMessage] = useState("");
  useEffect(() => {
    const myBookings = async (e) => {
      setLoading(true)
      setError("")
      // setMessage("")

      try {
        const res = await axiosInstance.get("/bookings/get");
        // setMessage(res.data.message);
        setBookings(res.data.myBookings)
      } catch (error) {
        setError(error.response?.data?.message || "Something went wrong")
      } finally {
        setLoading(false)
      }

    }
    myBookings();
  }, [])
  const handleCancellation = async (bookingId) => {
    try {
      const res = await axiosInstance.patch(`/bookings/${bookingId}/cancel`);
      console.log(res.data.message)
      const myBookings = await axiosInstance.get('/bookings/get');
      setBookings(myBookings.data.myBookings)
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7EF] px-6 py-12 text-emerald-950">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Your journeys
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            My Bookings
          </h1>
          <p className="mt-3 text-stone-600">
            Keep track of your rides and booking details.
          </p>
        </div>

        {loading && (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <p className="font-semibold text-emerald-800">
              Loading your bookings...
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="rounded-2xl border border-dashed border-emerald-900/20 bg-white/70 px-6 py-16 text-center">
            <div className="text-5xl">🛣️</div>
            <h2 className="mt-4 text-2xl font-bold">
              No bookings yet
            </h2>
            <p className="mt-2 text-stone-600">
              Your next journey starts with finding a ride.
            </p>
          </div>
        )}

        {!loading && bookings.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800">
                    Your booking
                  </span>

                  <span className="text-2xl">🚗</span>
                </div>

                <div className="my-6 flex items-center gap-3">
                  <div className="flex flex-1 items-center gap-2">
                    <span className="h-3 w-3 shrink-0 rounded-full bg-emerald-600" />
                    <p className="break-words text-lg font-bold">
                      {booking.ride?.source || "Unknown"}
                    </p>
                  </div>

                  <span className="text-xl text-emerald-600">→</span>

                  <div className="flex flex-1 items-center gap-2">
                    <span className="h-3 w-3 shrink-0 rounded-full bg-amber-500" />
                    <p className="break-words text-lg font-bold">
                      {booking.ride?.destination || "Unknown"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 rounded-xl bg-[#FAF7EF] p-4">
                  <div>
                    <p className="text-sm text-stone-500">Travel date</p>
                    <p className="mt-1 break-words font-semibold">
                      {booking.ride?.date
                        ? new Date(booking.ride.date).toLocaleDateString("en-IN")
                        : "Unavailable"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-stone-500">Departure</p>
                    <p className="mt-1 font-semibold">
                      {booking.ride?.departureTime || "Unavailable"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-stone-500">Seats booked</p>
                    <p className="mt-1 font-semibold">
                      {booking.seatsBooked}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-stone-500">Price per seat</p>
                    <p className="mt-1 text-xl font-extrabold text-emerald-800">
                      {booking.ride?.pricePerSeat != null
                        ? `₹${booking.ride.pricePerSeat} `
                        : "Unavailable"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-stone-500">Booking status</p>
                    <span
                      className={`mt - 1 inline - block rounded - full px - 3 py - 1 text - xs font - bold capitalize ${booking.bookingStatus === "confirmed"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-stone-200 text-stone-600"
                        } `}
                    >
                      {booking.bookingStatus}
                    </span>
                  </div>

                  {booking.bookingStatus === "confirmed" && (
                    <button
                      onClick={() => handleCancellation(booking._id)}
                      className="rounded-xl border border-red-200 px-4 py-2.5 font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )

}

export default MyBookings