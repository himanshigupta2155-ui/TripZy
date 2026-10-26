import React from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from './axiosCalls/axios'

function NavBar() {
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post("/users/logout");
      navigate("/login")

    } catch (error) {
      console.log(error.response?.data?.message || 'Logout failed')
    }
  }
  return (
    <nav className="sticky top-0 z-50 border-b border-emerald-900/10 bg-[#FAF7EF] shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-emerald-900 transition hover:text-emerald-700"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-800 text-xl text-cream-50 shadow-sm">
            🚗
          </span>
          TripZy<span className="text-emerald-600">.</span>
        </button>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <button
            onClick={() => navigate("/")}
            className="rounded-lg px-3 py-2 text-sm font-medium text-emerald-950 transition hover:bg-emerald-100"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/available-rides")}
            className="rounded-lg px-3 py-2 text-sm font-medium text-emerald-950 transition hover:bg-emerald-100"
          >
            Find a Ride
          </button>

          <button
            onClick={() => navigate("/my-bookings")}
            className="rounded-lg px-3 py-2 text-sm font-medium text-emerald-950 transition hover:bg-emerald-100"
          >
            My Bookings
          </button>
          <button
            onClick={() => navigate("/driver-requests")}
            className="rounded-lg px-3 py-2 text-sm font-medium text-emerald-950 transition hover:bg-emerald-100"
          >
            Driver Requests
          </button>

          <button
            onClick={() => navigate("/login")}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="rounded-lg bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md"
          >
            Sign Up
          </button>

          <button
            onClick={() => navigate("/create-ride")}
            className="rounded-lg border border-emerald-800 px-4 py-2.5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100"
          >
            Offer a Ride
          </button>
          <button onClick={handleLogout} className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50"
          >Logout</button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
