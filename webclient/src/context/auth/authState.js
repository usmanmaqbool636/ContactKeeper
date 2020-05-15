import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
} from '../types';
const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem("jwttoken"),
        isAuthenticated: null,
        loading: true,
        error:null,  
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    return (
        <AuthContext.Provider value={{

        }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState;