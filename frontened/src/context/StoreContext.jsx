import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = import.meta.env.VITE_API_URL || "http://localhost:4000";
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([]);
    const [user, setUser] = useState(null); // Add user state

    const addToCart = async (itemId) => {
        setCartItems((prev = {}) => ({
            ...prev,
            [itemId]: (prev?.[itemId] || 0) + 1
        }));

        if (token) {
            await axios.post(
                url + "/api/cart/add",
                { itemId },
                { headers: { token } }
            );
        }
    };


    const removeFromCart = async (itemId) => {
        setCartItems((prev = {}) => ({
            ...prev,
            [itemId]: Math.max((prev?.[itemId] || 0) - 1, 0)
        }));

        if (token) {
            await axios.post(
                url + "/api/cart/remove",
                { itemId },
                { headers: { token } }
            );
        }
    };


    const getTotalCartAmount = () => {
        let totalAmount = 0;

        food_list.forEach((item) => {
            const quantity = cartItems?.[item._id] || 0;
            totalAmount += quantity * item.price;
        });

        return totalAmount;
    };

    const deliveryCharge = () => {
        let amount = 30;
        return amount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
        setCartItems(response.data.cartData || {});
    }

    // Fetch user profile
    const fetchUserProfile = async (token) => {
        try {
            console.log("Fetching user profile with token:", token);
            const response = await axios.post(url + "/api/user/profile", {}, { headers: { token } });
            console.log("User profile response:", response.data);
            if (response.data.success) {
                setUser(response.data.user);
                console.log("User data set:", response.data.user);
            } else {
                console.error("Failed to fetch user profile:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
                await fetchUserProfile(localStorage.getItem("token")); // Fetch user profile
            }
        }
        loadData();
    }, [])

    useEffect(() => {
        console.log(cartItems)
    }, [cartItems])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        deliveryCharge,
        url,
        token,
        setToken,
        user,
        setUser,
        fetchUserProfile
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;
