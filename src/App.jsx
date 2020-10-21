import React from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";

import { Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import Products from "./components/Products/Products";
import Detail from "./components/Detail/Detail";
import Cart from "./components/Cart/Cart";

export default function App() {
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/:category" element={<Products />} />
            <Route path="/:category/:id" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
