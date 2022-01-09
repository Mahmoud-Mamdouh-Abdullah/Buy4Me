import { hideLoading, showLoading } from "react-redux-loading";
import { login } from "../../utils/api";

export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const REMOVE_AUTHED_USER = 'REMOVE_AUTHED_USER';
export const UPDATE_AUTHED_USER = 'UPDATE_AUTHED_USER';

const setAuthedUserAction = (user) => {
    return {
        type: SET_AUTHED_USER,
        payload: user
    }
}

export const updateAuthedUserAction = (user) => {
    return {
        type: UPDATE_AUTHED_USER,
        payload: user
    }
}

export const handleLogin = (email, password) => {
    return (dispatch) => {
        dispatch(showLoading());
        login(email, password).then(data => {
            if (data.message) {
                alert(data.message);
                dispatch(hideLoading());
                return dispatch(setAuthedUserAction(null));
            }
            dispatch(hideLoading());
            dispatch(setAuthedUserAction(data));
        })
    }
}


export const removeAuthedUserAction = () => {
    return {
        type: REMOVE_AUTHED_USER
    }
}