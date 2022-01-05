import { showLoading, hideLoading } from 'react-redux-loading';
import { getCart, updateCart } from '../../utils/api';

export const UPDATE_CART = 'UPDATE_CART';
export const GET_CART = 'GET_CART';
export const RESET_CART = 'RESET_CART';

export const getCartAction = (cart) => {
    return {
        type: GET_CART,
        payload: cart
    }
}
const updateCartAction = (products) => {
    return {
        type: UPDATE_CART,
        payload: products
    }
}

export const resetCart = () => {
    return {
        type: RESET_CART
    }
}


export const handleUpdateCartAction = (userId, products, token) => {
    return (dispatch) => {
        dispatch(showLoading());
        updateCart(userId, products, token).then(cart => {
            dispatch(updateCartAction(cart));
        })
        dispatch(hideLoading());
    }
}

export const handleGetCartAction = (userId, token) => {
    return (dispatch) => {
        dispatch(showLoading());
        getCart(userId, token).then(cart => {
            dispatch(getCartAction(cart));
        });
        dispatch(hideLoading());
    }
}