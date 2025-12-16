import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import { useState } from 'react'

function App() {
  const [showLogin,setShowLogin]=useState(false);
  return (
    <>
    
    {showLogin?<LoginPopUp setShowLogin={setShowLogin}></LoginPopUp>:<></>}
    <Navbar setShowLogin={setShowLogin}></Navbar>
    <Routes>
      <Route
      path='/'element={<Home></Home>}
      ></Route>
      <Route path='/Cart' element={<Cart></Cart>}></Route>
    
<Route path='/order' element={<PlaceOrder></PlaceOrder>}></Route>
</Routes>
<Footer></Footer>
    </>
  )
}

export default App