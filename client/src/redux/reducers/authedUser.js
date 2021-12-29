import { REMOVE_AUTHED_USER, SET_AUTHED_USER } from "../actions/authedUser";


export const authedUser = (authedUser = null, action) => {
    switch (action.type) {
        case SET_AUTHED_USER: {
            return action.payload;
        }

        case REMOVE_AUTHED_USER: {
            return null;
        }

        default: {
            return authedUser;
        }
    }
}