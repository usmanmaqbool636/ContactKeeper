import React, { useContext, useState, useEffect } from 'react';
import { Input } from 'semantic-ui-react'
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
        if (e.target.value !== "") {
            setText(e.target.value);
            filterContact(e.target.value)
        }
        else {
            clearFilter();
        }
    }
    return (
        <form style={{marginBottom:"1rem"}}>
            <Input type="text" size="small" icon="search" fluid onChange={changHandler} iconPosition='left' placeholder='Search users...' 
                style={{zIndex:"1"}}
            />
        </form>
    )
}
export default ContactFilter;