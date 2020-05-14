import React, { useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../context/contact/contactContext';
import ContactItem from '../contact/ContactItem';
import FlipMove from 'react-flip-move'
import './Contact.css'
const Contact = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered } = contactContext;
    const filterContacts = filtered ? filtered : contacts
    const animTime = filtered ? 200 : 500
    if (contacts.length === 0) {
        return <h4>Please Add Contact</h4>
    }
    return (
        <>
            <TransitionGroup>
                {filterContacts.map((contact) => {
                    return (
                        <CSSTransition key={contact.id} timeout={animTime} classNames="item">
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