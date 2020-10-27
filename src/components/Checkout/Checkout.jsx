import React from 'react'

const Checkout = () => {
    return (
        <>
            <h2>Checkout</h2>
            <form onSubmit={() => {}}>
                <div className="form-group">
                    <label className="form-label">Country</label>
                    <select className="form-control">
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
                    <input name="city" className="form-control"/>
                </div>
                <div className="form-group">
                    <label className="form-label">Address</label>
                    <input name="address" className="form-control"/>
                </div>
                <div>
                    <input type="submit" className="btn btn-primary" />
                </div>
            </form>
        </>
    )
}

export default Checkout;