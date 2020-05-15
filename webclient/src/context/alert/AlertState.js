import React, { useReducer } from 'react';
import AlerContext from './alertContext';
import AlertReducer from './alertReducer';
import { v4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from '../types';
const AlertState = (props) => {
    const initialState = []
    const [state, dispatch] = useReducer(AlertReducer, initialState)
    const setAlert = (msg, type) => {
        const id = v4();
        dispatch({ type: SET_ALERT, payload: { msg, type, id } })
        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
    }
    return (
        <AlerContext.Provider value={{
            alerts: state,
            setAlert
        }}>
            {props.children}
        </AlerContext.Provider>
    )
}
export default AlertState;