import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.userId; // 🔥 FROM TOKEN

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    console.log("Adding to cart:", itemId, "for user:", userId);
    let cartData = user.cartData || {};
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    console.log("New Cart Data:", cartData);
    user.cartData = cartData;
    user.markModified("cartData");
    await user.save(); // 🔥 THIS WAS MISSING LOGICALLY

    res.json({
      success: true,
      message: "Item added to cart",
      cartData
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error" });
  }
};


// remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.userId;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false });
    }

    let cartData = user.cartData || {};

    if (cartData[itemId] > 1) {
      cartData[itemId] -= 1;
    } else {
      delete cartData[itemId];
    }

    user.cartData = cartData;
    user.markModified("cartData");
    await user.save();

    res.json({
      success: true,
      message: "Item removed",
      cartData
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};


// fetch user cart data

const getCart = async (req, res) => {
  try {
    const userdata = await userModel.findById(req.userId);
    if (!userdata) {
      return res.json({ success: false, message: "User not found" });
    }
    const cartData = userdata.cartData || {};
    res.json({
      success: true,
      message: "User cart data fetched",
      cartData: cartData
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

export { addToCart, removeFromCart, getCart }


