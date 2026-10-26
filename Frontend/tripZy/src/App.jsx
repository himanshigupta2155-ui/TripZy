// import NavBar from './components/NavBar'
// import Home from './components/Home'
// import Login from './components/Login'
// import Register from './components/Register'
// import MyBookings from './components/MyBookings'
// import AvailableRides from './components/AvailableRides'
// import CreateRide from './components/CreateRide'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import DriverRequests from './components/DriverRequests'
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   return (
//     <BrowserRouter>
//       <NavBar />
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/register' element={<Register />} />
//         <Route path='/my-bookings' element={<MyBookings />} />
//         <Route path='/available-rides' element={<AvailableRides />} />
//         <Route path='/create-ride' element={<CreateRide />} />
//         <Route path="/driver-requests" element={<DriverRequests />} />
//       </Routes>
//     </BrowserRouter>
//   )

// }

// export default App

import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import MyBookings from './components/MyBookings'
import AvailableRides from './components/AvailableRides'
import CreateRide from './components/CreateRide'
import DriverRequests from './components/DriverRequests'
import ProtectedRoute from './components/ProtectedRoutes'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axiosInstance from './components/axiosCalls/axios'
function AppLayout() {

  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    axiosInstance.get('/users/me')
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false))
  }, [location.pathname])
  const isPublicPage = ['/login', '/register'].includes(location.pathname)

  return (
    <>
      {isAuthenticated && !isPublicPage && <NavBar />}

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/' element={
          <ProtectedRoute><Home /></ProtectedRoute>
        } />
        <Route path='/my-bookings' element={
          <ProtectedRoute><MyBookings /></ProtectedRoute>
        } />
        <Route path='/available-rides' element={
          <ProtectedRoute><AvailableRides /></ProtectedRoute>
        } />
        <Route path='/create-ride' element={
          <ProtectedRoute><CreateRide /></ProtectedRoute>
        } />
        <Route path='/driver-requests' element={
          <ProtectedRoute><DriverRequests /></ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App