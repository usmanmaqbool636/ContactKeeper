import React, { useContext, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from '../contact/ContactItem';
import Spinner from '../layout/spinner/Spinner';
import './Contact.css';

const Contact = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered, getAllContact } = contactContext;
    const [loading, setLoading] = useState(true)
    const filterContacts = filtered ? filtered : contacts
    const animTime = filtered ? 200 : 500;

    useEffect(() => {
        setLoading(true);
        if(localStorage.jwttoken){
            console.log("working")
            getAllContact(localStorage.jwttoken,() => {
                setLoading(false)
            });
        }
        // eslint-disable-next-line
    }, [localStorage.jwttoken])
    if (loading) {
        return <Spinner />
    }
    else if (contacts.length === 0) {
        return <h4>Please Add Contact</h4>
    }
    else return (
        <>
            <TransitionGroup>
                {filterContacts.map((contact) => {
                    return (
                        <CSSTransition key={contact._id} timeout={animTime} classNames="item">
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    )
                })}
                {/* {contacts.length} */}
            </TransitionGroup>
        </ >
    )
}
export default Contact;