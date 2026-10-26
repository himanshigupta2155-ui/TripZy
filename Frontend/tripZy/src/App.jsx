
import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import MyBookings from './components/MyBookings'
import AvailableRides from './components/AvailableRides'
import CreateRide from './components/CreateRide'
// import RideCard from './components/RideCard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DriverRequests from './components/DriverRequests'

function App() {


  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/my-bookings' element={<MyBookings/>}/>
      <Route path='/available-rides' element={<AvailableRides/>}/>
      {/* <Route path='/rideCard' element={<RideCard/>}/> */}
      <Route path='/create-ride' element={<CreateRide/>}/>
      <Route path="/driver-requests" element={<DriverRequests/>}/>
      </Routes>
    </BrowserRouter>
  )

}

export default App
