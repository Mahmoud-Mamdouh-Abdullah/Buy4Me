import { combineReducers } from 'redux';
import { authedUser } from './authedUser';
import { loadingBarReducer } from 'react-redux-loading'
import { cart } from './cart';
import { wishlist } from './wishlist';

export default combineReducers({
    authedUser,
    cart,
    wishlist,
    loadingBar: loadingBarReducer,
})