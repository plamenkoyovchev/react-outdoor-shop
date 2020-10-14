import React from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Spinner from "./Spinner";

import useFetch from "./hooks/useFetch";
import Products from "./components/Products/Products";

export default function App() {
  const { data: products, loading, error } = useFetch(
    "products?category=shoes"
  );

  if (error) {
    throw error;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>
            <select id="size">
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </section>
          <section id="products">
            <Products products={products} />
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
