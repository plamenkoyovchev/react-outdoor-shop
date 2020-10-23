import React, { useEffect } from "react";

import useFetchAll from "../../hooks/useFetchAll";
import Spinner from "../../Spinner";

const Cart = ({cart, updateQuantity}) => {
  const urls = cart.map((i) => `products/${i.id}`);
  const { data: products, loading, error } = useFetchAll(urls);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart])

  const renderCartItem = (item) => {
    const {id, sku, quantity} = item;
    const {price, name, image, skus} = products.find(
      (p) => p.id === parseInt(id)
    );
    const {size} = skus.find((s) => s.sku === sku);

      return (<li>
        <img src={`/images/${image}`} alt={name} />
        <h3>{name}</h3>
        <p>Size: {size}</p>
        <p>Price <strong>${price}</strong></p>
        <p>Quantity: {quantity}</p>
      </li>);
  };

  if(loading) {
    return <Spinner />;
  }

  if(error){
    throw error;
  }

  const numberOfItems = cart.reduce((total, item) => total + item.quantity , 0);

  return <section id="cart">
          <h1>Cart</h1>
          <h2>You have {numberOfItems} items in the Cart.</h2>
          <ul>
            {cart.map(renderCartItem)}
          </ul>
        </section>;
};

export default Cart;
