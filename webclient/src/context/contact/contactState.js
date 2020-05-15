import React, { Reducer, useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import axios from '../../axios';
import {
    ADD_CONTACT,
    CLEAR_FILTER,
    DELETE_CONTACT,
    FILTER_CONTACT,
    REMOVE_ALERT,
    SET_ALERT,
    SET_CURRENT,
    UPDATE_CONTACT,
    CLEAR_CURRENT,
    CONTACT_ERR,
    GET_ALL_CONTACT,
    CLEAR_CONTACTS,
    LOADING
} from '../types';

const ContactState = (props) => {
    const initialState = {
        contacts: [],
        loading: false,
        current: null,
        filtered: null,
        error: null,
        token: localStorage.getItem("jwttoken")
    }
    const [state, dispatch] = useReducer(ContactReducer, initialState);
    const { contacts, current, filtered, token } = state;
    const config = {
        headers: {
            "x-auth-token": token
        }
    }

    const addContact = async (contact) => {
        try {
            const res = await axios.post("/api/contact", contact, config)
            dispatch({ type: ADD_CONTACT, payload: res.data })
        }
        catch (err) {
            dispatch({ type: CONTACT_ERR, payload: err.responce.msg })
        }
    }
    const getAllContact = async (done) => {
        try {
            const res = await axios.get('/api/contact', config);
            dispatch({ type: GET_ALL_CONTACT, payload: res.data });
            done();
        } catch (err) {
            console.log(err.responce);
            dispatch({ type: CONTACT_ERR, payload: err.responce })
        }
    }
    const deleteContact = async (id, done) => {
        try {
            await axios.delete(`/api/contact/${id}`, config);
            dispatch({ type: DELETE_CONTACT, payload: id });
            done()


        } catch (err) {

        }
    }
    const updateContact = async (contact) => {
        const res = await axios.put("/api/contact", contact, config)
        dispatch({ type: UPDATE_CONTACT, payload: contact })

    }
    const setCurrent = (contact) => dispatch({ type: SET_CURRENT, payload: contact });
    const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });
    const filterContact = (text) => dispatch({ type: FILTER_CONTACT, payload: text })
    const clearFilter = () => dispatch({ type: CLEAR_FILTER })
    const setLoading = () => dispatch({ type: LOADING })
    const clearContact = () => dispatch({ type: CLEAR_CONTACTS })

    return (
        <ContactContext.Provider value={{
            ...state,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContact,
            clearFilter,
            getAllContact,
            clearContact
        }} >
            {props.children}
        </ContactContext.Provider>
    )
}
export default ContactState;