import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

function Order({ url }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders
  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/order/list`);
      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Update status
  const statusHandler = async (e, orderId) => {
    try {
      const res = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: e.target.value,
      });
      if (res.data.success) {
        toast.success("Order status updated");
        fetchAllOrders();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Food Processing":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Out for delivery":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Food Processing":
        return "🍳";
      case "Out for delivery":
        return "🚚";
      case "Delivered":
        return "✅";
      default:
        return "📦";
    }
  };

  const paidOrders = orders.filter(order => order.payment === true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 p-4 sm:p-6 lg:p-10">
      {/* ================= Header Section ================= */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-2xl shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Order Management
            </h1>
            <p className="text-gray-600 text-sm mt-1">Manage and track all customer orders • {paidOrders.length} paid orders</p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Orders */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1 uppercase tracking-wide">Total Orders</p>
                <p className="text-4xl font-extrabold text-gray-800">{paidOrders.length}</p>
                <p className="text-xs text-gray-500 mt-1">Paid orders only</p>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Processing Orders */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-500 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1 uppercase tracking-wide">Processing</p>
                <p className="text-4xl font-extrabold text-gray-800">
                  {paidOrders.filter(o => o.status === "Food Processing").length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Being prepared</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🍳</span>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${paidOrders.length > 0 ? (paidOrders.filter(o => o.status === "Food Processing").length / paidOrders.length) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          {/* Out for Delivery */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1 uppercase tracking-wide">Out for Delivery</p>
                <p className="text-4xl font-extrabold text-gray-800">
                  {paidOrders.filter(o => o.status === "Out for delivery").length}
                </p>
                <p className="text-xs text-gray-500 mt-1">On the way</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🚚</span>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-400 to-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${paidOrders.length > 0 ? (paidOrders.filter(o => o.status === "Out for delivery").length / paidOrders.length) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          {/* Delivered Orders */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-green-500 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1 uppercase tracking-wide">Delivered</p>
                <p className="text-4xl font-extrabold text-gray-800">
                  {paidOrders.filter(o => o.status === "Delivered").length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Completed</p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-green-50 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">✅</span>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-400 to-green-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${paidOrders.length > 0 ? (paidOrders.filter(o => o.status === "Delivered").length / paidOrders.length) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Orders Table ================= */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 font-semibold mt-4 text-lg">Loading orders...</p>
        </div>
      ) : paidOrders.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-lg p-16 text-center">
          <div className="inline-block p-8 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full mb-6">
            <img
              src={assets.parcel_icon}
              alt="No Orders"
              className="w-24 h-24 opacity-40"
            />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            No Paid Orders Found
          </h3>
          <p className="text-gray-500 text-lg">
            Orders with successful payments will appear here
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 grid grid-cols-12 gap-4 items-center text-white font-semibold text-sm">
            <div className="col-span-1 text-center">Order #</div>
            <div className="col-span-1 text-center">Date</div>
            <div className="col-span-3">Items</div>
            <div className="col-span-1 text-center">Amount</div>
            <div className="col-span-3">Delivery Address</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-1 text-center">Payment</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {paidOrders.map((order, index) => (
              <div
                key={order._id}
                className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-orange-50 transition-colors duration-200"
              >
                {/* Order Number */}
                <div className="col-span-1 text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-orange-100 rounded-xl">
                    <span className="text-orange-600 font-bold text-sm">#{index + 1}</span>
                  </div>
                </div>

                {/* Date */}
                <div className="col-span-1 text-center">
                  <p className="text-xs text-gray-600 font-medium">
                    {new Date(order.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.date).getFullYear()}
                  </p>
                </div>

                {/* Items - Horizontal Scroll */}
                <div className="col-span-3">
                  <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex-shrink-0 bg-orange-50 rounded-lg px-3 py-2 border border-orange-200 flex items-center gap-2 min-w-[140px]"
                      >
                        <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                          {item.quantity}
                        </span>
                        <span className="text-xs font-medium text-gray-800 truncate">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amount */}
                <div className="col-span-1 text-center">
                  <p className="text-lg font-bold text-orange-600">₹{order.amount}</p>
                </div>

                {/* Delivery Address - Compact */}
                <div className="col-span-3">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {order.address.street}, {order.address.city}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {order.address.contactNumber}
                  </p>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <select
                    value={order.status}
                    onChange={(e) => statusHandler(e, order._id)}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-semibold border-2 ${getStatusColor(order.status)}
                              focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer transition-all`}
                  >
                    <option value="Food Processing">🍳 Processing</option>
                    <option value="Out for delivery">🚚 Out for Delivery</option>
                    <option value="Delivered">✅ Delivered</option>
                  </select>
                </div>

                {/* Payment Status */}
                <div className="col-span-1 text-center">
                  <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full border border-green-300">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold">Paid</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #fef3c7;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ea580c;
        }
      `}</style>
    </div>
  );
}

export default Order;
