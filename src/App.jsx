import React from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";

import { Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import Products from "./components/Products/Products";
import Detail from "./components/Detail/Detail";
import Cart from "./components/Cart/Cart";
import { useState } from "react";

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (id, sku) => {
    setCart((cartItems) => {
      const itemInCart = cartItems.find((i) => i.sku === sku);
      if(itemInCart){
        return cartItems.map((i) => i.sku === sku ? {...i, quantity: i.quantity + 1} : i);
      } else {
        return [...cartItems, {id, sku, quantity: 1}];
      }
    })
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/:category" element={<Products />} />
            <Route path="/:category/:id" element={<Detail addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
