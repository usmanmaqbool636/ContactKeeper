import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef("");
    const { filterContact, clearFilter,filtered } = contactContext;
    useEffect(()=>{
        if(!filtered){
            text.current.value=""
        }
    },[])
    const changHandler = (e) => {
        if (text.current.value !== "") {
            filterContact(e.target.value)
        }
        else {
            clearFilter();
        }
    }
    return (
        <form>
            <input type="text" placeholder="Filter Contact" ref={text} onChange={changHandler} />
        </form>
    )
}
export default ContactFilter;