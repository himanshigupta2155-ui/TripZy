import React from 'react'
import { useNavigate } from 'react-router-dom'
function Home() {
  const navigate = useNavigate()
  return (
  
    <div className="min-h-screen bg-[#FAF7EF] text-emerald-950">
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">

        <div>
          <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
            ✦ Your journey, shared
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Welcome to TripZy
            <span className="mt-2 block text-emerald-700">
              Every journey starts together.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-stone-600">
            Find your next ride, share the road, and make every journey count.
            Travel together with TripZy.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/available-rides')}
              className="rounded-xl bg-emerald-800 px-7 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              Find a Ride →
            </button>

            <button
              onClick={() => navigate('/create-ride')}
              className="rounded-xl border border-emerald-800/25 bg-white px-7 py-4 font-semibold text-emerald-900 transition hover:bg-emerald-50"
            >
              Offer a Ride
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-stone-600">
            <span>✓ Easy booking</span>
            <span>✓ Shared journeys</span>
            <span>✓ Simple planning</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-emerald-200/40 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-emerald-900/10 bg-[#E8EBDD] p-8 shadow-xl sm:p-12">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-900">
                Your next adventure
              </span>
              <span className="text-2xl">✦</span>
            </div>

            <div className="py-12 text-center">
              <div className="text-8xl sm:text-9xl">🚗</div>
              <p className="mt-6 text-2xl font-bold text-emerald-950">
                Less alone. More road.
              </p>
              <p className="mt-3 text-stone-600">
                One ride can make the journey better.
              </p>
            </div>

            <div className="rounded-2xl bg-white/80 p-5">
              <p className="text-sm text-stone-500">Ready when you are</p>
              <p className="mt-1 font-bold text-emerald-900">
                Where will you go?
              </p>
            </div>
          </div>
        </div>

      </section>
    </div>

  )
}

export default Home