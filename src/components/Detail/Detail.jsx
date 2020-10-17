import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../Spinner";
import NotFound from "../NotFound/NotFound";

const Detail = () => {
  const { id } = useParams();
  const { loading, error, data: product } = useFetch(`products/${id}`);

  if (loading) {
    return <Spinner />;
  }

  if (!product) {
    return <NotFound />;
  }

  if (error) {
    throw error;
  }

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
};

export default Detail;
