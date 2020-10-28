import React from 'react'
import { useState } from 'react';

const initialState = {
    country: 0,
    city: "",
    address: ""
};

const Checkout = () => {

    const [checkoutData, setCheckoutData] = useState(initialState);

    const onFormSubmitHandler = (e) => {
        e.preventDefault();
    }

    const onChangeHandler = (e) => {
        e.persist();
        setCheckoutData((currentCheckoutData) => {
            return {
                ...currentCheckoutData,
                [e.target.name]: e.target.value
            };
        });
    }

    const onBlurHandler = (e) => {

    }

    return (
        <>
            <h2>Checkout</h2>
            <form onSubmit={onFormSubmitHandler}>
                <div className="form-group">
                    <label className="form-label">Country</label>
                    <select name="country" className="form-control" value={checkoutData.country} onChange={onChangeHandler} onBlur={onBlurHandler}>
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
                    <input name="city" className="form-control" value={checkoutData.city} onChange={onChangeHandler} onBlur={onBlurHandler} />
                </div>
                <div className="form-group">
                    <label className="form-label">Address</label>
                    <input name="address" className="form-control" value={checkoutData.address} onChange={onChangeHandler} onBlur={onBlurHandler} />
                </div>
                <div>
                    <input type="submit" className="btn btn-primary" />
                </div>
            </form>
        </>
    )
}

export default Checkout;