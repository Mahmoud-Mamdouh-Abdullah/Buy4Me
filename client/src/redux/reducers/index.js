import { combineReducers } from 'redux';
import { authedUser } from './authedUser';
import { loadingBarReducer } from 'react-redux-loading'
import { cart } from './cart';

export default combineReducers({
    authedUser,
    cart,
    loadingBar: loadingBarReducer
})