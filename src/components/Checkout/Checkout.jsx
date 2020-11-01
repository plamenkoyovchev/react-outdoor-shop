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
  const [touchedFields, setTouchedFields] = useState({});

  // Derived state
  const validationErrors = getErrors(checkoutData);
  const isValid = Object.keys(validationErrors).length === 0;

  const onFormSubmitHandler = async (e) => {
    e.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (isValid) {
      try {
        await saveShippingAddress(checkoutData);
        emptyCart();
        setStatus(STATUS.COMPLETED);
      } catch (error) {
        setError(error);
      }
    } else {
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

  const onBlurHandler = (e) => {
    e.persist();
    setTouchedFields((touched) => {
      return {
        ...touched,
        [e.target.name]: true,
      };
    });
  };

  if (error) {
    throw error;
  }

  if (status === STATUS.COMPLETED) {
    return <h1>Thank you for your order!</h1>;
  }

  return (
    <>
      <h2>Checkout</h2>
      {!isValid && status === STATUS.SUBMITTED && (
        <div role="alert">
          <p>Please fix errors:</p>
          <ul>
            {Object.keys(validationErrors).map((key) => (
              <li key={key}>{validationErrors[key]}</li>
            ))}
          </ul>
        </div>
      )}
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
          <p role="alert" className="validation">
            {(touchedFields.country || status === STATUS.SUBMITTED) &&
              validationErrors.country}
          </p>
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
          <p role="alert" className="validation">
            {(touchedFields.city || status === STATUS.SUBMITTED) &&
              validationErrors.city}
          </p>
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
          <p role="alert" className="validation">
            {(touchedFields.address || status === STATUS.SUBMITTED) &&
              validationErrors.address}
          </p>
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
    </>
  );
};

export default Checkout;

const getErrors = (checkoutData) => {
  const errors = {};

  if (+checkoutData.country === 0) {
    errors.country = "Country is required";
  }

  if (!checkoutData.city) {
    errors.city = "City is required";
  }

  if (!checkoutData.address) {
    errors.address = "Address is required";
  }

  return errors;
};
