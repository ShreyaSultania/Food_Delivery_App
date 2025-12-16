import React, { createContext, useEffect, useState } from 'react'
export const StoreContext=createContext(null);
import { food_list } from '../assets/assets';
const StoreContextProvider=(props)=>{
    const [cartItems,setCartItems]=useState({});
    const url="http://localhost:4000"
    const [token,setToken]=useState("")
    const addToCart=(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }
    const removeFromCart=(itemId)=>{
       setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        food_list.forEach((item)=>{
            if(cartItems[item._id]>0){
                totalAmount+=cartItems[item._id]*item.price;
            }
        })
        return totalAmount;
    }
  const deliveryCharge=()=>{
  let amount=30;
  return amount;
}
useEffect(()=>{
    if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
    }
},[])
    useEffect(()=>{
        console.log(cartItems)
    },[cartItems])
    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        deliveryCharge,
        url,
        token,setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;