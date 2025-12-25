import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order from frontend
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items,        // ✅ FIX
      amount: req.body.amount,
      address: req.body.address,    // ✅ FIX
      payment: false,
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => {   // ✅ FIX
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      };
    });

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 1,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `http://localhost:5173/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `http://localhost:5173/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({
      success: true,
      message: "Order Placed",
      session_url: session.url,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err.message || "Error",
    });
  }
};
const verifyOrder = async (req, res) => {

  const { orderId, success } = req.body;
  try {
    if (success) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      return res.json({
        success: true,
        message: "Payment Successful"
      })
    }
    else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({
        success: false,
        message: "Payment Failed"
      })
    }
  }
  catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error"
    })
  }
}

// user order for frontened
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId }).sort({ _id: -1 });
    res.json({
      success: true,
      orders
    })
  }
  catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error"
    })
  }
}

// listing order for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({
      success: true,
      data: orders,
    })
  }
  catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error"
    })
  }
}

// update order status for admin panel
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({
      success: true,
      message: "Status Updated"
    })
  }
  catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error"
    })
  }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
