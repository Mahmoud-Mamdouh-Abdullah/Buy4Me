import { GET_WISH_LIST, UPDATE_WISH_LIST } from "../actions/wishlist";

export const wishlist = (wishlist = {}, action) => {
    switch (action.type) {
        case UPDATE_WISH_LIST: {
            return action.payload;
        }
        case GET_WISH_LIST: {
            return action.payload;
        }
        default:
            return wishlist;
    }
}