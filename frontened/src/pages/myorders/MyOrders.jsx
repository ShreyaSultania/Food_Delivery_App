import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

function MyOrders() {
    const { url, token } = useContext(StoreContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                url + "/api/order/userorders",
                {},
                { headers: { token } }
            );
            if (response.data.success) {
                setOrders(response.data.orders);
            } else {
                console.error("Failed to fetch orders");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "processing":
                return "bg-yellow-100 text-yellow-700 border-yellow-300";
            case "out for delivery":
                return "bg-blue-100 text-blue-700 border-blue-300";
            case "delivered":
                return "bg-green-100 text-green-700 border-green-300";
            case "cancelled":
                return "bg-red-100 text-red-700 border-red-300";
            default:
                return "bg-gray-100 text-gray-700 border-gray-300";
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case "processing":
                return "🔄";
            case "out for delivery":
                return "🚚";
            case "delivered":
                return "✅";
            case "cancelled":
                return "❌";
            default:
                return "📦";
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-gradient-to-b from-orange-50 to-orange-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-xl font-semibold text-orange-600">Loading your orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-orange-50 to-orange-100 py-12 px-4">
            {/* Title */}
            <h1 className="text-4xl font-extrabold text-center text-orange-600 mb-10">
                My Orders
            </h1>

            {/* Container */}
            <div className="max-w-7xl mx-auto">
                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="text-6xl mb-4">🛒</div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">No Orders Yet</h2>
                        <p className="text-gray-500 text-lg">
                            Start ordering delicious food and your orders will appear here!
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {/* Table Header */}
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 grid grid-cols-12 gap-4 items-center font-semibold text-sm">
                            <div className="col-span-2">Order Date</div>
                            <div className="col-span-1 text-center">Amount</div>
                            <div className="col-span-4">Items</div>
                            <div className="col-span-3">Delivery Address</div>
                            <div className="col-span-1 text-center">Status</div>
                            <div className="col-span-1 text-center">Actions</div>
                        </div>

                        {/* Table Rows */}
                        <div className="divide-y divide-gray-200">
                            {orders.map((order, index) => (
                                <div key={index}>
                                    {/* Compact Row */}
                                    <div className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-orange-50 transition-colors duration-200">
                                        {/* Order Date */}
                                        <div className="col-span-2">
                                            <p className="text-sm font-semibold text-gray-800">
                                                {new Date(order.date).toLocaleDateString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>

                                        {/* Amount */}
                                        <div className="col-span-1 text-center">
                                            <p className="text-lg font-bold text-orange-600">₹{order.amount}</p>
                                        </div>

                                        {/* Items - Horizontal Scroll */}
                                        <div className="col-span-4">
                                            <div className="flex gap-2 overflow-x-auto pb-1">
                                                {order.items.map((item, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex-shrink-0 bg-orange-50 rounded-lg px-3 py-1.5 border border-orange-200 flex items-center gap-2"
                                                    >
                                                        <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                                            {item.quantity}
                                                        </span>
                                                        <span className="text-sm font-medium text-gray-800 whitespace-nowrap">
                                                            {item.name}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Delivery Address - Compact */}
                                        <div className="col-span-3">
                                            <p className="text-sm font-semibold text-gray-800">
                                                {order.address.firstName} {order.address.lastName}
                                            </p>
                                            <p className="text-xs text-gray-600 truncate">
                                                {order.address.street}, {order.address.city}
                                            </p>
                                            <p className="text-xs text-gray-500">📞 {order.address.contactNumber}</p>
                                        </div>

                                        {/* Status */}
                                        <div className="col-span-1 flex justify-center">
                                            <span
                                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                                    order.status
                                                )}`}
                                            >
                                                <span>{getStatusIcon(order.status)}</span>
                                                <span className="capitalize hidden xl:inline">{order.status}</span>
                                            </span>
                                        </div>

                                        {/* Actions */}
                                        <div className="col-span-1 flex justify-center gap-2">
                                            <button
                                                onClick={() => setExpandedOrder(expandedOrder === index ? null : index)}
                                                className="text-orange-600 hover:text-orange-700 font-semibold text-sm"
                                            >
                                                {expandedOrder === index ? "▲" : "▼"}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Expanded Details */}
                                    {expandedOrder === index && (
                                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                            <div className="grid grid-cols-2 gap-6">
                                                {/* Full Address */}
                                                <div>
                                                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                                        <span>📍</span> Complete Delivery Address
                                                    </h4>
                                                    <div className="text-sm text-gray-700 space-y-1">
                                                        <p className="font-semibold">
                                                            {order.address.firstName} {order.address.lastName}
                                                        </p>
                                                        <p>{order.address.street}</p>
                                                        <p>
                                                            {order.address.city}, {order.address.state} - {order.address.zipCode}
                                                        </p>
                                                        <p>{order.address.country}</p>
                                                        <p className="font-semibold mt-2">📞 {order.address.contactNumber}</p>
                                                        <p className="text-gray-600">✉️ {order.address.email}</p>
                                                    </div>
                                                </div>

                                                {/* Order Details */}
                                                <div>
                                                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                                        <span>🍽️</span> Order Details
                                                    </h4>
                                                    <div className="space-y-2">
                                                        {order.items.map((item, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="flex justify-between items-center bg-white rounded-lg p-3 border border-gray-200"
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                                                        {item.quantity}
                                                                    </span>
                                                                    <span className="text-sm font-medium text-gray-800">
                                                                        {item.name}
                                                                    </span>
                                                                </div>
                                                                <span className="text-sm font-bold text-orange-600">
                                                                    ₹{item.price * item.quantity}
                                                                </span>
                                                            </div>
                                                        ))}

                                                        {/* Payment Status */}
                                                        <div className="flex items-center gap-2 pt-2">
                                                            <span className="text-sm font-semibold text-gray-700">Payment:</span>
                                                            {order.payment ? (
                                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold border border-green-300">
                                                                    ✓ Paid
                                                                </span>
                                                            ) : (
                                                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold border border-red-300">
                                                                    ✗ Pending
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Track Order Button */}
                                                        {order.status.toLowerCase() !== "delivered" &&
                                                            order.status.toLowerCase() !== "cancelled" && (
                                                                <button
                                                                    onClick={fetchOrders}
                                                                    className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                                                                >
                                                                    Track Order 📦
                                                                </button>
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyOrders;
