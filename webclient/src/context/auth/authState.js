import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axios from '../../axios';
import {
    REGISTER_FAIL, REGISTER_SUCCESS,
    CLEAR_ERRORS, USER_LOAD, AUTH_ERROR, LOGIN_SUCCESS, lOGIN_FAIL, LOGOUT
} from '../types';
const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem("jwttoken"),
        isAuthenticated: false,
        loading: true,
        error: null,
        user: null
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    const register = async (formData) => {
        try {
            const res = await axios.post("/api/user", formData);
            dispatch({ type: REGISTER_SUCCESS, payload: res.data })
        }
        catch (err) {
            dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg })
        }
    }
    const login = async (formData) => {
        try {
            const res = await axios.post("/api/auth", formData);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        }
        catch (err) {
            dispatch({ type: lOGIN_FAIL, payload: err.response.data.msg })

        }
    }
    const logout=()=>dispatch({type:LOGOUT});
    const clearError = () => dispatch({ type: CLEAR_ERRORS })
    const loadUser = async () => {
        try {
            const res = await axios.get("/api/auth", { headers: { "x-auth-token": state.token } })
            dispatch({ type: USER_LOAD, payload: res.data });
        } catch (err) {
            dispatch({ type: AUTH_ERROR });
        }
    }
    return (
        <AuthContext.Provider value={{
            ...state,
            register,
            clearError,
            loadUser,
            login,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState;