import React from "react";
import { assets } from "../../assets/assets";

function AppDownload() {
  return (
    <>
      <div className="text-center py-14 px-4 sm:px-6 md:px-10 lg:px-16 bg-[#fff7f0] rounded-xl shadow-md w-full max-w-4xl mx-auto scroll-m-0" id="app-download">
        
        {/* Heading */}
        <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 leading-snug">
          Experience Download <br />
          <span className="text-orange-500 font-bold">Tomato App</span>
        </p>

        {/* Store Buttons */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8">
          <img
            src={assets.play_store}
            alt="Play Store"
            className="w-32 sm:w-40 md:w-48 cursor-pointer hover:scale-105 transition-all"
          />
          <img
            src={assets.app_store}
            alt="App Store"
            className="w-32 sm:w-40 md:w-48 cursor-pointer hover:scale-105 transition-all"
          />
        </div>

      </div>
    </>
  );
}

export default AppDownload;
