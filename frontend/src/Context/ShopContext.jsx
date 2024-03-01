import axios from "axios";
import React, { createContext, useState } from "react";
import { useEffect } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  // for (let index = 0; index < all_product.length + 1; index++) {
  //   cart[index] = 0;
  // }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState();

  const addToCart = (product) => {
    console.log("adding to cart", product);
    setCartItems((prev) => ({
      ...prev,
      [product.id]: {
        count: ((prev[product.id] && prev[product.id]["count"]) || 0) + 1,
        product: product,
      },
    }));
  };

  const removeFromCart = (productId) => {
    console.log(cartItems[productId]);
    let newItems = {};
    Object.keys(cartItems)
      .filter((id) => id != productId)
      .map((id) => (newItems[id] = cartItems[id]));
    setCartItems(newItems);
  };

  const clearCart = () => {
    setCartItems(getDefaultCart());
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    // Object.keys(cartItems).map(key=>cartItems[key][])
    for (const item in cartItems) {
      totalAmount +=
        cartItems[item]["count"] *
        cartItems[item]["product"]["discounted_price"];
      console.log(totalAmount);
      // if (cartItems[item] > 0) {
      //   let itemInfo = all_product.find(
      //     (product) => product.id === Number(item)
      //   );
      //   totalAmount += itemInfo.new_price * cartItems[item];
      // }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      totalItem += cartItems[item]["count"];
      // if (cartItems[item] > 0) {
      //   totalItem += cartItems[item];
      // }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    products,
    setProducts,
    all_product,
    cartItems,
    // DeleteItem,
    addToCart,
    removeFromCart,
    address,
    setAddress,
    clearCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
