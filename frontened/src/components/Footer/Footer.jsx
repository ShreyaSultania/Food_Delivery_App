import React from "react";
import { assets } from "../../assets/assets";

function Footer() {
  return (
    <>
      <div className="bg-[#1a1a1a] text-white px-4 sm:px-8 md:px-16 lg:px-20 py-12" id="footer">

        {/* Footer Content */}
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          gap-10 
          sm:text-left text-center
        ">

          {/* Logo + Description */}
          <div className="flex flex-col items-center sm:items-start">
            <img src={assets.logo} alt="" className="w-28 sm:w-32 mb-4" />
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base max-w-xs">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
              enim distinctio unde amet aliquam animi ducimus, sint minus?
            </p>

            <div className="flex gap-4 mt-4">
              <img src={assets.facebook_icon} alt="" className="w-7 sm:w-8 hover:scale-110 transition" />
              <img src={assets.twitter_icon} alt="" className="w-7 sm:w-8 hover:scale-110 transition" />
              <img src={assets.linkedin_icon} alt="" className="w-7 sm:w-8 hover:scale-110 transition" />
            </div>
          </div>

          {/* Company Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-lg sm:text-xl font-semibold text-orange-400 mb-3">COMPANY</h2>
            <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
              <li className="hover:text-orange-400 cursor-pointer">Home</li>
              <li className="hover:text-orange-400 cursor-pointer">About us</li>
              <li className="hover:text-orange-400 cursor-pointer">Delivery</li>
              <li className="hover:text-orange-400 cursor-pointer">Privacy policy</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-lg sm:text-xl font-semibold text-orange-400 mb-3">GET IN TOUCH</h2>
            <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
              <li>+1-34574542</li>
              <li>contact@tomato.com</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-8" />

        {/* Copyright */}
        <p className="text-center text-gray-400 text-sm sm:text-base">
          © 2025 tomato.com — All rights reserved.
        </p>
      </div>
    </>
  );
}

export default Footer;
