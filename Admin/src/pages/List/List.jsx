import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


function List({ url }) {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetched from food list");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };
  const removeFood = async (id) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: id });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error("error")
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4 sm:p-6 bg-orange-50 min-h-screen">

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-orange-600 mb-6">
        🍽 All Foods List
      </h2>

      {/* Table Header (hidden on small screens) */}
      <div className="hidden md:grid grid-cols-5 bg-orange-500 text-white font-semibold px-4 py-3 rounded-t-lg shadow">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p className="text-center">Action</p>
      </div>

      {/* Food List */}
      <div className="bg-white rounded-lg md:rounded-t-none shadow-md">
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center 
                       px-4 py-4 border-b hover:bg-orange-50 transition"
          >

            {/* Image */}
            <div className="flex justify-center md:justify-start">
              <img
                src={`${url}/images/${item.image}`}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg border"
              />
            </div>

            {/* Name */}
            <p className="font-semibold text-gray-700 text-center md:text-left">
              {item.name}
            </p>

            {/* Category */}
            <p className="text-gray-600 text-center md:text-left">
              {item.category}
            </p>

            {/* Price */}
            <p className="font-bold text-orange-600 text-center md:text-left">
              ₹ {item.price}
            </p>

            {/* Action */}
            <button onClick={() => {
              removeFood(item._id)
            }}
              className="mx-auto md:mx-0 bg-red-100 text-red-600 
                         px-4 py-1 rounded-full font-bold
                         hover:bg-red-200 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default List;
