import { REGISTER_FAIL, REGISTER_SUCCESS, CLEAR_ERRORS, USER_LOAD, AUTH_ERROR, LOGIN_SUCCESS, lOGIN_FAIL, LOGOUT, FACEBOOK_LOGIN } from '../types';

export default (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case FACEBOOK_LOGIN:
        case LOGIN_SUCCESS:
            localStorage.setItem("jwttoken", action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case lOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('jwttoken')
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                loading: false,
                user: null,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case USER_LOAD:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        default:
            return state;
    }
}