import {
    ADD_CONTACT,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    DELETE_CONTACT,
    FILTER_CONTACT,
    REMOVE_ALERT,
    SET_ALERT,
    SET_CURRENT,
    UPDATE_CONTACT,
    CONTACT_ERR,
    GET_ALL_CONTACT,
    CLEAR_CONTACTS,
    LOADING
} from '../types';


const contactReducer = (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [ action.payload,...state.contacts]
            }
        case GET_ALL_CONTACT:
            return {
                ...state,
                loading: false,
                contacts: action.payload
            }
        case DELETE_CONTACT:
            return {
                ...state,
                loading:false,
                contacts: state.contacts.filter(c => c._id !== action.payload)
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(c => {
                    if (c._id === action.payload._id) {
                        return action.payload;
                    }
                    return c;
                })
            }
        case FILTER_CONTACT:
            return {
                ...state,
                filtered: state.contacts.filter(c => {
                    const regex = new RegExp(`${action.payload}`, "gi");
                    return c.name.match(regex) || c.email.match(regex);
                })
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
                loading:false
            }
        case CONTACT_ERR:
            return {
                ...state,
                error: action.payload,
                loading:false
            }
        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: [],
                current: null,
                filtered: null,
                error: null,
                loading:false
            }
        case LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}
export default contactReducer;