import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { getTotalCartAmount, token, setToken, user, setUser } = useContext(StoreContext);
  const dropdownRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("token")
    setToken("");
    setUser(null); // Clear user data
    navigate("/");
  }

  // Debug: Log user data
  useEffect(() => {
    console.log("User data in Navbar:", user);
  }, [user]);

  // Close dropdown on scroll or click outside
  useEffect(() => {
    const handleScroll = () => {
      if (showMenu) {
        setShowMenu(false);
      }
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      window.addEventListener('scroll', handleScroll);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);
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
            {(getTotalCartAmount() > 0) ? <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span> : ""}

          </Link>
        </div>
        {!token ? <button
          className="px-6 py-2 rounded-full bg-orange-500 text-white font-semibold shadow-md hover:shadow-xl hover:bg-orange-600 transition-all duration-300"
          onClick={() => setShowLogin(true)}
        >
          Sign In
        </button> : <div ref={dropdownRef} className="relative inline-block">

          {/* Profile Section with Name */}
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 cursor-pointer bg-white/60 hover:bg-white px-3 py-2 rounded-full transition-all duration-300 hover:shadow-md"
          >
            {/* User Avatar with Initials */}
            {user && user.name ? (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xs uppercase">
                  {user.name.trim().split(' ').filter(n => n).map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
            ) : (
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            )}
            {/* Show username or 'User' as fallback */}
            <span className="text-sm font-semibold text-gray-800 hidden sm:inline">
              {user && user.name ? user.name : 'User'}
            </span>
            <svg
              className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${showMenu ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Dropdown */}
          {showMenu && (
            <ul
              className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg 
                 border border-orange-100 overflow-hidden z-50 animate-fadeIn"
            >
              {/* User Info Header */}
              {user && (
                <>
                  <li className="px-4 py-3 bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
                    <p className="text-sm font-bold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-600 truncate">{user.email}</p>
                  </li>
                </>
              )}

              {/* Orders */}
              <li
                onClick={() => {
                  navigate('/myorders');
                  setShowMenu(false);
                }}
                className="flex items-center gap-3 px-4 py-3 
                   hover:bg-orange-50 cursor-pointer transition"
              >
                <img src={assets.bag_icon} alt="Orders" className="w-5 h-5" />
                <p className="text-sm font-medium text-gray-700">Orders</p>
              </li>

              <hr className="border-orange-100" />

              {/* Logout */}
              <li onClick={() => {
                logout();
                setShowMenu(false);
              }}
                className="flex items-center gap-3 px-4 py-3 
                   hover:bg-orange-100 cursor-pointer transition"
              >
                <img src={assets.logout_icon} alt="Logout" className="w-5 h-5" />
                <p className="text-sm font-medium text-red-600">Logout</p>
              </li>

            </ul>
          )}
        </div>
        }

      </div>
    </nav>
  )
}

export default Navbar;

