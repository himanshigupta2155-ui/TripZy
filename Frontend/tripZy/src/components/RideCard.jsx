import React from 'react'

function RideCard({ ride, onBook }) {
  return (
    <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition">

      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-500">From</p>
          <h3 className="text-xl font-bold text-emerald-800">
            {ride.source}
          </h3>
        </div>

        <span className="text-emerald-600 text-xl">→</span>

        <div className="text-right">
          <p className="text-sm text-gray-500">To</p>
          <h3 className="text-xl font-bold text-emerald-800">
            {ride.destination}
          </h3>
        </div>
      </div>

      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">Date:</span> {ride.date}
        </p>

        <p>
          <span className="font-semibold">Departure:</span>{' '}
          {ride.departureTime}
        </p>

        <p>
          <span className="font-semibold">Available seats:</span>{' '}
          {ride.availableSeats}
        </p>

        <p>
          <span className="font-semibold">Price per seat:</span>{' '}
          ₹{ride.pricePerSeat}
        </p>
      </div>

      <button
        onClick={() => onBook(ride._id)}
        disabled={ride.availableSeats <= 0}
        className="w-full mt-5 bg-emerald-700 text-white py-3 rounded-xl font-semibold hover:bg-emerald-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
      >
        {ride.availableSeats < 1 ? 'No Seats Available' : 'Book Ride'}
      </button>

    </div>
  )
}

export default RideCard
