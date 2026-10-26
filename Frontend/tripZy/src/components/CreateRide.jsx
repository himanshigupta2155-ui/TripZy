import React from 'react'
import { useState } from 'react'
import axiosInstance from './axiosCalls/axios'
function CreateRide() {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    date: "",
    departureTime: "",
    availableSeats: "",
    pricePerSeat: ""
  })
  const [error, setError] = useState("")
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.source ||
      !formData.destination ||
      !formData.date ||
      !formData.departureTime ||
      !formData.availableSeats ||
      !formData.pricePerSeat

    ) {
      alert("Please fill all fields");
      return;
    }
    if (Number(formData.availableSeats) < 1 || Number(formData.pricePerSeat) < 0) {
      alert("Seats must be at least 1 and price cannot be negative");
      return;
    }
    try {
      setError("");
      const res = await axiosInstance.post('/rides/create', {
        ...formData,
        availableSeats: Number(formData.availableSeats),
        pricePerSeat: Number(formData.pricePerSeat)

      })
      setFormData({
        source: "",
        destination: "",
        departureTime: "",
        date: "",
        pricePerSeat: "",
        availableSeats: ""
      })
      console.log(res.data);
      alert("Ride created successfully!")
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  }
  // return (
  //   <div>
  //     <h2>Offer a Ride</h2>
  //     <form onSubmit={handleSubmit}>
  //       <input
  //         type="text"
  //         value={formData.source}
  //         onChange={handleChange}
  //         name="source"
  //         placeholder="Source"
  //       />
  //       <input
  //         type="text"
  //         value={formData.destination}
  //         onChange={handleChange}
  //         name="destination"
  //         placeholder="Destination"
  //       />
  //       <input
  //         type="time"
  //         value={formData.departureTime}
  //         onChange={handleChange}
  //         name="departureTime"
  //         placeholder="Departure time"
  //       />
  //       <input
  //         type="number"
  //         value={formData.availableSeats}
  //         onChange={handleChange}
  //         name="availableSeats"
  //         placeholder="Available seats"
  //         min="1"
  //       />
  //       <input
  //         type="date"
  //         value={formData.date}
  //         onChange={handleChange}
  //         name="date"
  //         placeholder="Date"
  //       />
  //       <input
  //         type="number"
  //         value={formData.pricePerSeat}
  //         onChange={handleChange}
  //         name="pricePerSeat"
  //         min="0"
  //         placeholder="Price per seat"
  //       />
  //       {error && <p>{error}</p>}
  //       <button type="submit">Create Ride</button>
  //     </form>
  //   </div>
  // )

  return (
    <div className="min-h-screen bg-[#F8F5EC] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
            Your journey starts here
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-emerald-950 sm:text-5xl">
            Offer a Ride
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-stone-600">
            Heading somewhere? Share your journey, meet fellow travellers, and
            make every seat count.
          </p>
        </div>

        <div className="rounded-3xl border border-emerald-900/10 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-10">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
              🚗
            </div>
            <div>
              <h2 className="text-xl font-bold text-emerald-950">
                Ride details
              </h2>
              <p className="mt-1 text-sm text-stone-500">
                Fill in the details of your upcoming trip.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Starting point
                </label>
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  placeholder="e.g. Bengaluru"
                  required
                  className="w-full rounded-xl border border-stone-200 bg-[#FDFCF8] px-4 py-3 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g. Mysuru"
                  required
                  className="w-full rounded-xl border border-stone-200 bg-[#FDFCF8] px-4 py-3 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Travel date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-stone-200 bg-[#FDFCF8] px-4 py-3 text-stone-800 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Departure time
                </label>
                <input
                  type="time"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-stone-200 bg-[#FDFCF8] px-4 py-3 text-stone-800 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Available seats
                </label>
                <input
                  type="number"
                  name="availableSeats"
                  value={formData.availableSeats}
                  onChange={handleChange}
                  placeholder="Number of seats"
                  min="1"
                  step="1"
                  required
                  className="w-full rounded-xl border border-stone-200 bg-[#FDFCF8] px-4 py-3 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Price per seat (₹)
                </label>
                <input
                  type="number"
                  name="pricePerSeat"
                  value={formData.pricePerSeat}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  min="0"
                  step="any"
                  required
                  className="w-full rounded-xl border border-stone-200 bg-[#FDFCF8] px-4 py-3 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                />
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {error}
              </div>
            )}

            <div className="border-t border-stone-100 pt-6">
              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-800 px-6 py-4 font-semibold text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-600/20 active:scale-[0.99]"
              >
                Create Your Ride →
              </button>
              <p className="mt-4 text-center text-xs leading-5 text-stone-500">
                Please double-check your trip details before publishing.
              </p>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-stone-500">
          Travel together. Share the journey. 🌿
        </p>
      </div>
    </div>
  )

}

export default CreateRide