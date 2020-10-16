import React from "react";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../Spinner";
import Product from "../Product/Product";

const Products = () => {
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
        {products && products.map((p) => <Product key={p.id} {...p} />)}
      </section>
    </>
  );
};

export default Products;
