import React, { useContext, useState, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    // const text = useRef("");
    const { filterContact, clearFilter, filtered } = contactContext;
    const [text, setText] = useState("")
    useEffect(() => {
        if (!filtered) {
            setText(text)
        }
        // eslint-disable-next-line
    }, [])
    const changHandler = (e) => {
        console.log(e.target.value)
        if (text !== "") {
            setText(e.target.value);
            filterContact(e.target.value)
        }
        else {
            clearFilter();
        }
    }
    return (
        <form>
            <input type="text" placeholder="Filter Contact" value={text} onChange={changHandler} />
        </form>
    )
}
export default ContactFilter;