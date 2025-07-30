import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { books } from "../assets/data";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_charges = 5;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [books, setBooks] = useState([]);
  const [cartItems, setCartItems] = useState({});

  //Adding items to card
  const addToCart = async (itemId) => {
    const cartData = { ...cartItems }; // use shollow copy
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      try {
        if (cartItems[item] > 0) {
          totalCount += cartItems[item];
        }
      } catch (error) {
        console.log(error);
      }
    }
    return totalCount;
  };

  //getting total cart amount

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = books.find((book) => book._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  //updating the quantity

  const updateQuantity = async (itemId, quantity) => {
    const cartData = { ...cartItems };
    cartData[itemId] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  //getting all products data
  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      // console.log(response.data);
      if (response.data.success) {
        setBooks(response.data.products);
      }
      if (response.data.success) {
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //getting userCart data

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
    getProductData();
  });

  const contextValue = {
    books,
    currency,
    navigate,
    token,
    setToken,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    getCartAmount,
    updateQuantity,
    delivery_charges,
    backendUrl,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
