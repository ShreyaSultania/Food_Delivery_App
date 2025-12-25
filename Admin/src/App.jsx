import React from 'react'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Orders/Order'
import { ToastContainer } from 'react-toastify';
// Admin panel setup
function App() {
  const url = "http://localhost:4000"
  return (
    <>
      <ToastContainer></ToastContainer>
      <Navbar />
      <hr />
      <div className="flex h-screen overflow-hidden">
        <SideBar />

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto bg-orange-50">
          <Routes>
            <Route path="/" element={<Add url={url} />} />
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/order" element={<Order url={url} />} />
          </Routes>
        </div>
      </div>

    </>
  )
}

export default App
