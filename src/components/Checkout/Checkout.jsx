import React from 'react'

const Checkout = () => {
    return (
        <>
            <h2>Checkout</h2>
            <form onSubmit={() => {}}>
                <div>
                    <label>Country</label>
                    <select>
                        <option value={0}>--Choose Country--</option>
                        <option value={1}>Bulgaria</option>
                        <option value={2}>Germany</option>
                        <option value={3}>UK</option>
                        <option value={4}>France</option>
                        <option value={5}>Switzerland</option>
                    </select>
                </div>
                <div>
                    <label>City</label>
                    <input name="city" />
                </div>
                <div>
                    <label>Address</label>
                    <input name="address" />
                </div>
                <div>
                    <input type="submit" className="btn btn-primary" />
                </div>
            </form>
        </>
    )
}

export default Checkout;