import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import { useState } from 'react'
import Verify from './pages/verify/Verify.jsx'
import MyOrders from './pages/myorders/MyOrders.jsx'

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  // Hide footer on these pages
  const hideFooterPaths = ['/cart', '/order', '/verify', '/myorders'];
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname.toLowerCase());

  return (
    <>

      {showLogin ? <LoginPopUp setShowLogin={setShowLogin}></LoginPopUp> : <></>}
      <Navbar setShowLogin={setShowLogin}></Navbar>
      <Routes>
        <Route
          path='/' element={<Home></Home>}
        ></Route>
        <Route path='/Cart' element={<Cart></Cart>}></Route>

        <Route path='/order' element={<PlaceOrder></PlaceOrder>}></Route>
        <Route path="/verify" element={<Verify></Verify>}></Route>
        <Route path="/myorders" element={<MyOrders></MyOrders>}></Route>
      </Routes>
      {shouldShowFooter && <Footer></Footer>}
    </>
  )
}

export default App