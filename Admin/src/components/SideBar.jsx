import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

function SideBar() {
  // const [image,setImage]=useState(false);
  return (
    <div className="md:block w-64 h-full bg-white shadow-lg border-r border-orange-100 p-4 overflow-y-auto">

      <NavLink
        to="/add"
        className={({ isActive }) =>
          `flex items-center gap-4 p-3 mb-2 rounded-lg cursor-pointer transition
          ${isActive
            ? "bg-orange-200 text-orange-700"
            : "text-gray-700 hover:bg-orange-100"}`
        }
      >
        <img src={assets.add_icon} alt="" className="w-6 h-6" />
        <p className="font-medium">Add Items</p>
      </NavLink>

      <NavLink
        to="/list"
        className={({ isActive }) =>
          `flex items-center gap-4 p-3 mb-2 rounded-lg cursor-pointer transition
          ${isActive
            ? "bg-orange-200 text-orange-700"
            : "text-gray-700 hover:bg-orange-100"}`
        }
      >
        <img src={assets.order_icon} alt="" className="w-6 h-6" />
        <p className="font-medium">List Items</p>
      </NavLink>

      <NavLink
        to="/order"
        className={({ isActive }) =>
          `flex items-center gap-4 p-3 mb-2 rounded-lg cursor-pointer transition
          ${isActive
            ? "bg-orange-200 text-orange-700"
            : "text-gray-700 hover:bg-orange-100"}`
        }
      >
        <img src={assets.order_icon} alt="" className="w-6 h-6" />
        <p className="font-medium">Orders</p>
      </NavLink>

    </div>
  )
}

export default SideBar
