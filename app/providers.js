"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer, initialCartState } from "../lib/reducers/cartReducer";
import { authReducer, initialAuthState } from "../lib/reducers/authReducer";

const AppContext = createContext();

export function Providers({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("alibzon-cart");
    if (savedCart) {
      cartDispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("alibzon-cart", JSON.stringify(cartState));
  }, [cartState]);

  // Load auth from localStorage
  useEffect(() => {
    const token = localStorage.getItem("alibzon-token");
    const user = localStorage.getItem("alibzon-user");
    if (token && user) {
      authDispatch({
        type: "LOGIN_SUCCESS",
        payload: { token, user: JSON.parse(user) },
      });
    }
  }, []);

  const value = {
    cart: cartState,
    cartDispatch,
    auth: authState,
    authDispatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within Providers");
  }
  return context;
};
