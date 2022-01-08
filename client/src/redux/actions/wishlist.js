import { hideLoading, showLoading } from "react-redux-loading";
import { getWishList, updateWishList } from "../../utils/api";


export const UPDATE_WISH_LIST = 'UPDATE_WISH_LIST';
export const GET_WISH_LIST = 'GET_WISH_LIST';


export const updateWishListAction = (products) => {
    return {
        type: UPDATE_WISH_LIST,
        payload: products
    }
}

export const handleUpdateWishListAction = (userId, products, token) => {
    return (dispatch) => {
        dispatch(showLoading());
        updateWishList(userId, products, token).then((wishlist) => {
            console.log(wishlist);
            dispatch(updateWishListAction(wishlist));
        });
        dispatch(hideLoading());
    }
}


export const getWishListAction = (wishlist) => {
    return {
        type: GET_WISH_LIST,
        payload: wishlist
    }
}


export const handleGetWishListAction = (userId, token) => {
    return (dispatch) => {
        dispatch(showLoading());
        getWishList(userId, token).then(wishlist => {
            dispatch(getWishListAction(wishlist));
            dispatch(hideLoading());
        });
    }
}