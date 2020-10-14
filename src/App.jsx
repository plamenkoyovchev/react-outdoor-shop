import React from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Spinner from "./Spinner";

import useFetch from "./hooks/useFetch";

export default function App() {
  const { data: products, loading, error } = useFetch(
    "products?category=shoes"
  );

  const renderProduct = (p) => {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  };

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
            {products && products.map(renderProduct)}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
