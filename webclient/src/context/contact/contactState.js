import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import axios from 'axios';
import {
    ADD_CONTACT,
    CLEAR_FILTER,
    DELETE_CONTACT,
    FILTER_CONTACT,
    SET_CURRENT,
    UPDATE_CONTACT,
    CLEAR_CURRENT,
    CONTACT_ERR,
    GET_ALL_CONTACT,
    CLEAR_CONTACTS
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
    const { token } = state;

    const addContact = async (contact, token) => {
        try {
            const res = await axios.post("/api/contact", contact, {
                headers: {
                    "x-auth-token": token
                }
            })
            dispatch({ type: ADD_CONTACT, payload: res.data })
        }
        catch (err) {
            dispatch({ type: CONTACT_ERR, payload: err.responce })
        }
    }
    const getAllContact = async (token, done) => {
        try {
            const res = await axios.get('/api/contact', {
                headers: {
                    "x-auth-token": token
                }
            });
            dispatch({ type: GET_ALL_CONTACT, payload: res.data });
            done();
        } catch (err) {
            dispatch({ type: CONTACT_ERR, payload: err.responce })
        }
    }
    const deleteContact = async (id, token, done) => {
        try {
            await axios.delete(`/api/contact/${id}`, {headers:{
                "x-auth-token":token
            }});
            dispatch({ type: DELETE_CONTACT, payload: id });
            done()


        } catch (err) {

        }
    }
    const updateContact = async (contact,token) => {
        await axios.put("/api/contact", contact, {headers:{
            "x-auth-token":token
        }})
        dispatch({ type: UPDATE_CONTACT, payload: contact });

    }
    const setCurrent = (contact) => dispatch({ type: SET_CURRENT, payload: contact });
    const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });
    const filterContact = (text) => dispatch({ type: FILTER_CONTACT, payload: text });
    const clearFilter = () => dispatch({ type: CLEAR_FILTER });
    const clearContact = () => dispatch({ type: CLEAR_CONTACTS });

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