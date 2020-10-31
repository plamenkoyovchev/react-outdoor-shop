const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD": {
            const { cart: items } = state;
            const { id, sku } = action.payload;

            const itemInCart = items.find((i) => i.sku === sku);
            if (itemInCart) {
                return {
                    ...state,
                    cart: items.map((i) => i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i)
                };
            } else {
                return {
                    ...state,
                    cart: [...items, { id, sku, quantity: 1 }]
                };
            }
        }
        case "UPDATE_QUANTITY": {
            const { cart: items } = state;
            const { sku, quantity } = action.payload;
            if (quantity === 0) {
                return {
                    ...state,
                    cart: items.filter((i) => i.sku !== sku)
                };
            }

            const itemInCart = items.find((i) => i.sku === sku);
            if (itemInCart) {
                return {
                    ...state,
                    cart: items.map((i) => i.sku === sku ? { ...i, quantity } : i)
                };
            }

            return state;
        }
        case "EMPTY":
            return {
                ...state,
                cart: []
            }
        default:
            console.warn('action.type is not found');
            return state;
    }
}

export default cartReducer;