import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../Spinner";
import Product from "../Product/Product";
import NotFound from "../NotFound/NotFound";
import { useParams } from "react-router-dom";

const Products = () => {
  const { category } = useParams();
  const { data: products, loading, error } = useFetch(
    `products?category=${category}`
  );
  const [size, setSize] = useState("");

  const getFilteredProducts = () => {
    return size
      ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
      : products;
  };

  if (error) {
    throw error;
  }

  if (loading) {
    return <Spinner />;
  }

  if (!products || products.length === 0) {
    return <NotFound />;
  }

  const filteredProducts = getFilteredProducts();

  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>
        <select id="size" onChange={(e) => setSize(e.target.value)}>
          <option value="">All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        {size && <h2>Found {filteredProducts.length} items</h2>}
      </section>
      <section id="products">
        {filteredProducts &&
          filteredProducts.map((p) => (
            <Product key={p.id} {...p} category={category} />
          ))}
      </section>
    </>
  );
};

export default Products;
