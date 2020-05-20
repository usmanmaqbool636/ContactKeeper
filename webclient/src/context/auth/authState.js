import React, { useReducer, useEffect } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axios from 'axios';
import {
    REGISTER_FAIL, REGISTER_SUCCESS,
    CLEAR_ERRORS, USER_LOAD, AUTH_ERROR, LOGIN_SUCCESS, lOGIN_FAIL, LOGOUT,
    FACEBOOK_LOGIN,
    GOOGLE_LOGIN
} from '../types';
const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem("jwttoken"),
        isAuthenticated: null,
        loading: true,
        error: null,
        user: null
    }
    useEffect(() => {
        console.log("loading User")
        if (localStorage.jwttoken) {
            loadUser(localStorage.jwttoken)
        } else {
            loadUser("")
        }
    }, [])
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
            dispatch({ type: lOGIN_FAIL, payload: err.response.data })

        }
    }
    const logout = () => dispatch({ type: LOGOUT });
    const clearError = () => dispatch({ type: CLEAR_ERRORS })
    const loadUser = async (token) => {
        try {
            const res = await axios.get("/api/auth", { headers: { "x-auth-token": token } })
            dispatch({ type: USER_LOAD, payload: res.data });
        } catch (err) {
            dispatch({ type: AUTH_ERROR });
        }
    }
    const facebookLogin = async (user) => {
        try {
            const res = await axios.post("api/auth/sociallogin", user);
            console.log("facebookLogin", "working")
            dispatch({ type: FACEBOOK_LOGIN, payload: res.data })
        } catch (err) {
            dispatch({ type: lOGIN_FAIL, payload: err.response.data })
        }

    }
    const gooleLogin = async (user) => {
        try {
            const res = await axios.post("api/auth/sociallogin", user);
            console.log("Google Login", "working")
            dispatch({ type: GOOGLE_LOGIN, payload: res.data })
        } catch (err) {
            console.log(err.response.data);
            dispatch({ type: lOGIN_FAIL, payload: err.response.data })
        }
    }
    return (
        <AuthContext.Provider value={{
            ...state,
            register,
            clearError,
            loadUser,
            login,
            logout,
            facebookLogin,
            gooleLogin
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState;