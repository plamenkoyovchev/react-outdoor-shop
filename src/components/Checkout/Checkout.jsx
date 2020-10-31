import React, { useState } from "react";
import { STATUS } from "./Status";

import { saveShippingAddress } from "../../services/shippingService";

const initialState = {
  country: 0,
  city: "",
  address: "",
};

const Checkout = ({ emptyCart }) => {
  const [checkoutData, setCheckoutData] = useState(initialState);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);

  const onFormSubmitHandler = async (e) => {
    e.preventDefault();
    setStatus(STATUS.SUBMITTING);

    try {
      await saveShippingAddress(checkoutData);
      emptyCart();
      setStatus(STATUS.COMPLETED);
    } catch (error) {
      setError(error);
      setStatus(STATUS.SUBMITTED);
    }
  };

  const onChangeHandler = (e) => {
    e.persist();
    setCheckoutData((currentCheckoutData) => {
      return {
        ...currentCheckoutData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onBlurHandler = (e) => {};

  if (error) {
    throw error;
  }

  if (status === STATUS.COMPLETED) {
    return <h1>Thank you for your order!</h1>;
  }

  return (
    <h2>
      <h2>Checkout</h2>
      <form onSubmit={onFormSubmitHandler}>
        <div className="form-group">
          <label className="form-label">Country</label>
          <select
            name="country"
            className="form-control"
            value={checkoutData.country}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
          >
            <option value={0}>--Choose Country--</option>
            <option value={1}>Bulgaria</option>
            <option value={2}>Germany</option>
            <option value={3}>UK</option>
            <option value={4}>France</option>
            <option value={5}>Switzerland</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">City</label>
          <input
            name="city"
            className="form-control"
            value={checkoutData.city}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Address</label>
          <input
            name="address"
            className="form-control"
            value={checkoutData.address}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
          />
        </div>
        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Checkout"
            disabled={status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </h2>
  );
};

export default Checkout;
