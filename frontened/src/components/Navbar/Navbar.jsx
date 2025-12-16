import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const navigate=useNavigate();
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext);
const logout=()=>{
  localStorage.removeItem("token")
  setToken("");
  navigate("/");
}
  return (
    <nav className="w-full sticky top-0 z-50 bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 backdrop-blur-md shadow-lg px-4 sm:px-6 py-4 
        flex flex-wrap items-center justify-between gap-4">

      {/* Logo */}
      <div className="flex items-center gap-2 group">
        <img 
          src={assets.logo} 
          alt="Food Delivery Logo" 
          className="w-24 sm:w-28 object-contain transition-transform duration-300 group-hover:scale-105" 
        />
      </div>

      {/* Menu */}
      <ul className="flex flex-wrap justify-center md:flex-nowrap items-center gap-6 sm:gap-10 text-black font-semibold tracking-wide w-full md:w-auto">

        <Link 
          to="/" 
          smooth='true' 
          duration={500}
          className={`relative cursor-pointer transition-all duration-300 hover:text-orange-700
            after:absolute after:left-0 after:-bottom-1 after:w-0 after:bg-orange-600 
            after:transition-all after:duration-300 hover:after:w-full
            ${menu === "home" ? "text-orange-700 after:w-full" : ""}`}
          onClick={() => setMenu("home")}
        >
          Home
        </Link>

        <a 
          href="#explore-menu"
          className={`relative cursor-pointer transition-all duration-300 hover:text-orange-700
            after:absolute after:left-0 after:-bottom-1 after:w-0 after:bg-orange-600
            after:transition-all after:duration-300 hover:after:w-full
            ${menu === "menu" ? "text-orange-700 after:w-full" : ""}`}
          onClick={() => setMenu("menu")}
        >
          Menu
        </a>

        <a 
          href="#app-download"
          className={`relative cursor-pointer transition-all duration-300 hover:text-orange-700
            after:absolute after:left-0 after:-bottom-1 after:w-0 after:bg-orange-600
            after:transition-all after:duration-300 hover:after:w-full
            ${menu === "app" ? "text-orange-700 after:w-full" : ""}`}
          onClick={() => setMenu("app")}
        >
          Mobile App
        </a>

        <a 
          href="#footer"
          className={`relative cursor-pointer transition-all duration-300 hover:text-orange-700
            after:absolute after:left-0 after:-bottom-1 after:w-0 after:bg-orange-600
            after:transition-all after:duration-300 hover:after:w-full
            ${menu === "contact" ? "text-orange-700 after:w-full" : ""}`}
          onClick={() => setMenu("contact")}
        >
          Contact Us
        </a>

      </ul>

      {/* Right Section */}
      <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 sm:gap-6 w-full md:w-auto">

        {/* Search */}
        <div className="p-2 rounded-full bg-white/60 hover:bg-white transition cursor-pointer">
          <img src={assets.search_icon} alt="Search" className="w-5" />
        </div>

        {/* Cart */}
        <div className="relative p-2 rounded-full bg-white/60 hover:bg-white transition cursor-pointer">
        <Link to='/cart'>
          <img src={assets.basket_icon} alt="Cart" className="w-5" />
          {(getTotalCartAmount()>0)? <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>:""}
         
        </Link>
        </div>
          {!token?<button 
          className="px-6 py-2 rounded-full bg-orange-500 text-white font-semibold shadow-md hover:shadow-xl hover:bg-orange-600 transition-all duration-300" 
          onClick={() => setShowLogin(true)}
        > 
          Sign In
        </button>:<div className="relative inline-block">

  {/* Profile Icon */}
  <img
    src={assets.profile_icon}
    alt="Profile"
    className="w-10 h-10 cursor-pointer rounded-full 
               hover:ring-2 hover:ring-orange-400 transition"
  />

  {/* Dropdown */}
  <ul
    className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg 
               border border-orange-100 overflow-hidden z-50"
  >

    {/* Orders */}
    <li
      className="flex items-center gap-3 px-4 py-3 
                 hover:bg-orange-50 cursor-pointer transition"
    >
      <img src={assets.bag_icon} alt="Orders" className="w-5 h-5" />
      <p className="text-sm font-medium text-gray-700">Orders</p>
    </li>

    <hr className="border-orange-100" />

    {/* Logout */}
    <li onClick={logout}
      className="flex items-center gap-3 px-4 py-3 
                 hover:bg-orange-100 cursor-pointer transition"
    >
      <img src={assets.logout_icon} alt="Logout" className="w-5 h-5" />
      <p className="text-sm font-medium text-red-600">Logout</p>
    </li>

  </ul>
</div>
} 
      
      </div>
    </nav>
  )
}

export default Navbar;
