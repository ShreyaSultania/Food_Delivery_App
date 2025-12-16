import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, food_list, removeFromCart,getTotalCartAmount,deliveryCharge} = useContext(StoreContext);
 const navigate=useNavigate()
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 py-12 px-4">

      {/* Title */}
      <h1 className="text-3xl font-extrabold text-center text-orange-600 mb-10">
        Your Cart
      </h1>

      {/* CONTAINER */}
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="bg-orange-500 text-white font-semibold p-4 rounded-lg shadow grid grid-cols-7 text-center">
          <p>Item</p>
          <p className="col-span-2">Title</p>
          <p>Price</p>
          <p>Qty</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        {/* Items */}
        {food_list.map((item, index) => (
          cartItems[item._id] > 0 && (
            <div
              key={index}
              className="grid grid-cols-7 items-center bg-white rounded-lg shadow-md p-4 border border-orange-100 hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt=""
                className="w-16 h-16 rounded-lg border object-cover"
              />

              <p className="col-span-2 font-semibold text-gray-800">{item.name}</p>

              <p className="text-gray-700 font-semibold">₹{item.price}</p>

              <p className="text-gray-900 font-semibold bg-orange-100 rounded-md px-3 py-1 w-fit mx-auto">
                {cartItems[item._id]}
              </p>

              <p className="text-gray-900 font-bold">
                ₹{item.price * cartItems[item._id]}
              </p>

              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 text-white px-3 py-2 rounded-md text-sm hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          )
        ))}

        {/* Empty Cart */}
        {Object.values(cartItems).every((qty) => qty === 0) && (
          <p className="text-center text-gray-600 mt-10 text-xl font-semibold">
            Your cart is empty 🛒
          </p>
        )}

        {/* Cart Totals Section AT BOTTOM */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-orange-200 mt-10">
          <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">
            Cart Totals
          </h2>

          <div className="space-y-4 text-gray-700 text-lg">

            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className="font-semibold">₹{getTotalCartAmount()}</p>
            </div>

            <hr className="border-orange-300" />

            <div className="flex justify-between">
              <p>Delivery Charges</p>
              <p className="font-semibold">
                ₹{getTotalCartAmount()==0?0:deliveryCharge()}</p>
             
            </div>

            <hr className="border-orange-300" />

            <div className="flex justify-between text-xl font-bold">
              <p>Total</p>
              <p>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+deliveryCharge()}</p>
            </div>
          </div>

          <button className="w-full mt-6 bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-all shadow-md text-lg" onClick={()=>{
            navigate('/order');
          }}>
            PROCEED TO CHECKOUT
          </button>
        </div>

      </div>
    </div>
  );
}

export default Cart;
