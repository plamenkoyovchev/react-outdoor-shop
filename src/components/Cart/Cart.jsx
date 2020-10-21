import React from "react";

import useFetchAll from "../../hooks/useFetchAll";
import Spinner from "../../Spinner";

const Cart = ({cart, updateQuantity}) => {
  const urls = cart.map((i) => `products/${i.id}`);
  const { data: products, loading, error } = useFetchAll(urls);

  const renderCartItem = (item) => {
    const {id, sku, quantity} = item;
    const {price, name, image, skus} = products.find(
      (p) => p.id === parseInt(id)
    );
    const {size} = skus.find((s) => s.sku === sku);
  };

  if(loading) {
    return <Spinner />;
  }

  if(error){
    throw error;
  }

  return <section id="cart">
          <h1>Cart</h1>
          <ul>
            {cart.map(renderCartItem)}
          </ul>
        </section>;
};

export default Cart;
