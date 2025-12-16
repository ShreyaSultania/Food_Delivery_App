import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

function FoodItems({ id, name, price, description, image }) {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div
      className="
        w-full bg-white rounded-xl 
        border border-orange-100 
        hover:border-orange-400 hover:shadow-md 
        transition-all duration-300 
        overflow-hidden
      "
    >
      {/* Image */}
      <div className="w-full h-40 sm:h-44 md:h-48 bg-orange-50 overflow-hidden relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Name + Rating */}
        <div className="flex items-start justify-between mb-2">
          <p className="text-sm sm:text-base font-semibold text-gray-800 leading-tight">
            {name}
          </p>
          <img
            src={assets.rating_starts}
            alt="rating"
            className="w-12 sm:w-16"
          />
        </div>

        {/* Description */}
        <p className="text-gray-500 text-xs sm:text-sm mb-3 line-clamp-2">
          {description}
        </p>

        {/* Price + Add/Remove Buttons */}
        <div className="flex items-center justify-between">
          <p className="text-base sm:text-lg font-bold text-orange-600">
            ₹{price}
          </p>

          {!cartItems[id] ? (
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              alt="add item"
              className="w-7 h-7 sm:w-8 sm:h-8 cursor-pointer hover:scale-110 transition"
            />
          ) : (
            <div className="flex items-center gap-2 bg-orange-50 rounded-lg p-1 sm:p-1.5">
              <img
                onClick={() => removeFromCart(id)}
                src={assets.remove_icon_red}
                alt="remove item"
                className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:scale-110 transition"
              />
              <p className="text-xs sm:text-sm font-semibold px-1 sm:px-2">
                {cartItems[id]}
              </p>
              <img
                onClick={() => addToCart(id)}
                src={assets.add_icon_green}
                alt="add item"
                className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:scale-110 transition"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodItems;
