import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
function PlaceOrder() {
  const { getTotalCartAmount, deliveryCharge, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    contactNumber: "",
  });

  const onchangehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    console.log("Order Placed", data);
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          name: item.name,
          price: item.price,
          quantity: cartItems[item._id],
        })
      }
    })
    // console.log("orderItems", orderItems);
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + deliveryCharge(),
      payment: "stripe",
    }
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token: localStorage.getItem("token") }
    })
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.href = session_url;
    }
    else {
      alert("Order failed: " + response.data.message);
    }
  };

  const inputStyle = `
    w-full p-4 rounded-xl bg-white/60 border border-orange-300 shadow-md
    backdrop-blur-md text-gray-700 placeholder-gray-500
    focus:ring-4 focus:ring-orange-300 focus:border-orange-600
    transition duration-300
  `;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 py-16 px-6">
      <h1 className="text-4xl font-extrabold text-center text-orange-700 mb-14">
        Checkout & Delivery
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* FORM */}
        <form
          onSubmit={placeOrder}
          className="lg:col-span-2 bg-white/40 backdrop-blur-xl shadow-2xl rounded-3xl p-10"
        >
          <h2 className="text-3xl font-bold text-orange-700 mb-8">
            Delivery Information
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <input className={inputStyle} name="firstName" value={data.firstName} onChange={onchangehandler} placeholder="First Name" />
            <input className={inputStyle} name="lastName" value={data.lastName} onChange={onchangehandler} placeholder="Last Name" />
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <input className={inputStyle} name="email" value={data.email} onChange={onchangehandler} placeholder="Email" />
            <input className={inputStyle} name="street" value={data.street} onChange={onchangehandler} placeholder="Street" />
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <input className={inputStyle} name="city" value={data.city} onChange={onchangehandler} placeholder="City" />
            <input className={inputStyle} name="state" value={data.state} onChange={onchangehandler} placeholder="State" />
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <input className={inputStyle} name="zipCode" value={data.zipCode} onChange={onchangehandler} placeholder="Zip Code" />
            <input className={inputStyle} name="country" value={data.country} onChange={onchangehandler} placeholder="Country" />
          </div>

          <input
            className={`${inputStyle} mt-6`}
            name="contactNumber"
            value={data.contactNumber}
            onChange={onchangehandler}
            placeholder="Contact Number"
            type="number"
          />

          <button
            type="submit"
            className="mt-10 w-full bg-orange-600 text-white py-4 text-xl font-bold rounded-xl"
          >
            Proceed to Payment
          </button>
        </form>

        {/* SUMMARY */}
        <div className="bg-white/50 rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-orange-700 mb-6 text-center">
            Cart Summary
          </h2>

          <div className="space-y-4 text-xl">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : deliveryCharge()}</p>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-2xl">
              <p>Total</p>
              <p>
                ₹
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + deliveryCharge()}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PlaceOrder;
