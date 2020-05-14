import React, { Reducer, useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';

import {
    ADD_CONTACT,
    CLEAR_FILTER,
    DELETE_CONTACT,
    FILTER_CONTACT,
    REMOVE_ALERT,
    SET_ALERT,
    SET_CURRENT,
    UPDATE_CONTACT,
    CLEAR_CURRENT
} from '../types';

const ContactState = (props) => {
    const initialState = {
        contacts: [
            {
                "id": "3D5CE80C-B718-9864-E1BF-239286830592",
                "name": "Rajah",
                "email": "pulvinar@liberoProin.net",
                "phone": "1-441-681-8372",
                "type": 'personal'
            },
            {
                "id": "E6C6CDE4-90D2-6F72-FF25-B86F01FBD93E",
                "name": "Maxwell",
                "email": "Phasellus.nulla@velquamdignissim.ca",
                "phone": "1-188-313-1650",
                "type": 'personal'
            },
            {
                "id": "72B5DFF9-3450-79D4-3170-7B365D75E7BB",
                "name": "Ivor",
                "email": "Cum@elitelitfermentum.edu",
                "phone": "1-880-332-8989",
                "type": 'professional'
            },
            {
                "id": "155D6C9E-322E-274B-4FA3-FB03A60424CE",
                "name": "Ronan",
                "email": "Vivamus@Sed.com",
                "phone": "1-183-113-6232",
                "type": 'professional'
            }
        ],
        current: null,
        filtered: null
    }

    const addContact = (contact) => {
        contact.id = uuid();
        dispatch({ type: ADD_CONTACT, payload: contact })
    }
    const deleteContact = (id, done) => {
        setTimeout(() => {
            dispatch({ type: DELETE_CONTACT, payload: id });
            done();
        }, 1000);
    }
    const updateContact = (contact) => dispatch({ type: UPDATE_CONTACT, payload: contact })
    const setCurrent = (contact) => dispatch({ type: SET_CURRENT, payload: contact });
    const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });
    const filterContact = (text) => dispatch({ type: FILTER_CONTACT, payload: text })
    const clearFilter = () => dispatch({ type: CLEAR_FILTER })

    const [state, dispatch] = useReducer(ContactReducer, initialState);
    const { contacts, current,filtered } = state;
    return (
        <ContactContext.Provider value={{
            contacts,
            current,
            filtered,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContact,
            clearFilter
        }} >
            {props.children}
        </ContactContext.Provider>
    )
}
export default ContactState;