import { GET_CART, RESET_CART, UPDATE_CART } from "../actions/cart";



export const cart = (cart = {}, action) => {
    switch (action.type) {
        case UPDATE_CART: {
            return action.payload;
        }

        case GET_CART: {
            return action.payload;
        }

        case RESET_CART: {
            return {};
        }

        default:
            return cart
    }
}