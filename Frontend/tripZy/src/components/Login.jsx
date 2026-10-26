import React from 'react'
import { useState } from 'react'
import axiosInstance from './axiosCalls/axios';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setMessage("");
      const res = await axiosInstance.post('/users/login', {
        email, password
      })
      console.log(res.data.message)
      setMessage(res.data.message);
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  // return (
  //   <form onSubmit={handleLogin}>
  //     <label>Email</label>
  //     <input 
  //       type="email"
  //       value={email}
  //       onChange={(e)=>setEmail(e.target.value)}
  //     />
  //     <label>Password</label>
  //     <input 
  //       type="password"
  //       value={password}
  //       onChange={(e)=>setPassword(e.target.value)}
  //     />
  //     <button type="submit">{loading?"Logging In" : "Login"}</button>
  //     {message && <p>{message}</p>}
  //     {error && <p>{error}</p>}

  //   </form>
  // )

  return (
    <div className="min-h-screen bg-[#F8F7F0] px-4 py-10 flex flex-col items-center justify-center">

      {/* TripZy Logo */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-3xl text-white shadow-md">
          🚘
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-emerald-800">
          TripZy
        </h1>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl sm:p-9">

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Welcome back!
          </h2>

          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            Log in to continue your journey.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-700 px-4 py-3.5 font-semibold text-white shadow-md transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          {/* Success Message */}
          {message && (
            <p className="rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-800">
              ✓ {message}
            </p>
          )}

          {/* Error Message */}
          {error && (
            <p className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

        </form>

        {/* Register Link */}
        <div className="mt-7 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-semibold text-emerald-700 hover:text-emerald-900"
          >
            Register
          </button>
        </div>

      </div>

      <p className="mt-6 text-center text-xs text-slate-400">
        Your journey starts with TripZy.
      </p>

    </div>
  )

}

export default Login