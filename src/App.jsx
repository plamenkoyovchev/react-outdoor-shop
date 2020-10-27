import React, { useReducer } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";

import { Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import Products from "./components/Products/Products";
import Detail from "./components/Detail/Detail";
import Cart from "./components/Cart/Cart";
import cartReducer from "./store/reducers/cartReducer";

const initialState = {
  cart: [],
};
try {
  initialState.cart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  console.warn("Can't read cart items!");
}

export default function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { cart } = state;

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Detail dispatch={dispatch} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} dispatch={dispatch} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
