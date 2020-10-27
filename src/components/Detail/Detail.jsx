import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../Spinner";
import NotFound from "../NotFound/NotFound";

const Detail = ({ dispatch }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sku, setSku] = useState("");
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

      <select id="size" value={sku} onChange={(e) => setSku(e.target.value)}>
        <option value="">--Choose size--</option>
        {product.skus.map(({ sku, size }) => (
          <option key={sku} value={sku}>
            {size}
          </option>
        ))}
      </select>

      <p>
        <button
          disabled={!sku}
          className="btn btn-primary"
          onClick={() => {
            dispatch({
              type: "ADD",
              payload: {
                id: product.id,
                sku,
              },
            });
            navigate("/cart");
          }}
        >
          Add to Cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
};

export default Detail;
