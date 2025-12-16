import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

function PlaceOrder() {
  const { getTotalCartAmount, deliveryCharge } = useContext(StoreContext);

  // Premium Tailwind Input Class (reusable string)
  const inputStyle = `
    w-full p-4 rounded-xl bg-white/60 border border-orange-300 shadow-md
    backdrop-blur-md text-gray-700 placeholder-gray-500
    focus:ring-4 focus:ring-orange-300 focus:border-orange-600
    transition duration-300
  `;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 py-16 px-6">

      {/* PAGE TITLE */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-orange-700 drop-shadow-lg tracking-wide mb-14">
        Checkout & Delivery
      </h1>

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* LEFT SIDE — Delivery Form */}
        <div className="lg:col-span-2 bg-white/40 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/60">

          <h2 className="text-3xl font-bold text-orange-700 mb-8 tracking-wide">
            Delivery Information
          </h2>

          {/* FORM GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input className={inputStyle} placeholder="First Name" />
            <input className={inputStyle} placeholder="Last Name" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <input className={inputStyle} placeholder="Email Address" />
            <input className={inputStyle} placeholder="Street" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <input className={inputStyle} placeholder="City" />
            <input className={inputStyle} placeholder="State" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <input className={inputStyle} placeholder="Zip Code" />
            <input className={inputStyle} placeholder="Country" />
          </div>

          <input
            className={`${inputStyle} mt-6`}
            placeholder="Contact Number"
            type="number"
          />
        </div>

        {/* RIGHT SIDE — Summary */}
        <div className="bg-white/50 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-3xl p-8 pt-10 border border-orange-200 flex flex-col justify-between min-h-[400px]">

          <div>
            <h2 className="text-3xl font-bold text-orange-700 mb-8 text-center tracking-wide">
              Cart Summary
            </h2>

            <div className="space-y-6 text-gray-800 text-xl">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p className="font-semibold">₹{getTotalCartAmount()}</p>
              </div>

              <div className="flex justify-between">
                <p>Delivery Charges</p>
                 <p className="font-semibold">
                ₹{getTotalCartAmount()==0?0:deliveryCharge()}</p>
              </div>

              <hr className="border-orange-300" />

              <div className="flex justify-between text-2xl font-bold text-orange-700">
                <p>Total</p>
                <p>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+deliveryCharge()}</p>
              </div>
            </div>
          </div>

          {/* Bottom Checkout Button */}
          <button className="mt-10 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 text-xl font-bold rounded-xl shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-transform">
            Proceed to Payment
          </button>

        </div>

      </div>
    </div>
  );
}

export default PlaceOrder;
