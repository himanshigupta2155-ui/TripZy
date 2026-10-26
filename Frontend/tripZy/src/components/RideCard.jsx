// import React from 'react'

// function RideCard({
//   ride,
//   showStatus = false,
//   onAction,
//   actionLabel = 'View Ride',
//   actionDisabled = false,
// }) {
//   return (
//     <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:shadow-md md:p-7">
//       <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

//         {/* Ride Information */}
//         <div className="flex-1">
//           <div className="flex flex-wrap items-center gap-3">
//             {showStatus && (
//               <span
//                 className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                   ride.status === 'Confirmed'
//                     ? 'bg-emerald-100 text-emerald-800'
//                     : 'bg-gray-100 text-gray-600'
//                 }`}
//               >
//                 {ride.status}
//               </span>
//             )}

//             <span className="text-sm text-gray-500">
//               {ride.date}
//             </span>
//           </div>

//           <div className="mt-5 flex flex-wrap items-center gap-4">
//             <div>
//               <p className="text-xl font-bold text-gray-900">
//                 {ride.source}
//               </p>
//               <p className="mt-1 text-sm text-gray-500">Starting point</p>
//             </div>

//             <div className="flex min-w-12 flex-1 items-center gap-2">
//               <div className="h-px flex-1 bg-emerald-200" />
//               <span>🚗</span>
//               <div className="h-px flex-1 bg-emerald-200" />
//             </div>

//             <div>
//               <p className="text-xl font-bold text-gray-900">
//                 {ride.destination}
//               </p>
//               <p className="mt-1 text-sm text-gray-500">Destination</p>
//             </div>
//           </div>

//           <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
//             {ride.time && <span>🕒 {ride.time}</span>}
//             {ride.seats != null && <span>💺 {ride.seats} seat(s)</span>}
//             {ride.driver && <span>👤 {ride.driver}</span>}
//           </div>
//         </div>

//         {/* Price and Action */}
//         <div className="border-t border-gray-100 pt-5 md:border-l md:border-t-0 md:pl-7 md:pt-0">
//           <p className="text-sm text-gray-500">Price per seat</p>

//           <p className="mt-1 text-3xl font-bold text-[#176B50]">
//             ₹{ride.price}
//           </p>

//           {onAction && (
//             <button
//               type="button"
//               onClick={() => onAction(ride)}
//               disabled={actionDisabled}
//               className="mt-4 w-full rounded-xl bg-[#176B50] px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {actionLabel}
//             </button>
//           )}
//         </div>

//       </div>
//     </div>
//   )
// }

// export default RideCard

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
