import React from 'react'
import { assets } from '../assets/assets'

function Navbar() {
  return (
    <div className="w-full h-16 bg-white flex items-center justify-between px-6 shadow-md sticky top-0 z-50">
      
      {/* Logo */}
      <img
        src={assets.logo}
        alt="Logo"
        className="h-10 object-contain cursor-pointer"
      />

      {/* Profile */}
      <img
        src={assets.profile_image}
        alt="Profile"
        className="h-10 w-10 rounded-full object-cover cursor-pointer border-2 border-orange-500"
      />
    </div>
  )
}

export default Navbar
