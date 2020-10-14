import React from "react";
import Product from "../Product/Product";

const Products = ({ products }) => {
  return products && products.map((p) => <Product key={p.id} {...p} />);
};

export default Products;
