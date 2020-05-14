import React, { useContext } from 'react';
import ContactContext from '../context/contact/contactContext';
import ContactItem from '../contact/ContactItem';
const Contact = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered } = contactContext;
    const filterContacts = filtered ? filtered : contacts
    console.log(filterContacts)
    if (contacts.length === 0) {
        return <h4>Please Add Contact</h4>
    }
    return (
        <>
            {filterContacts.map((contact) => {
                return (
                    <ContactItem key={contact.id} contact={contact} />
                )
            })}
            {/* {contacts.length} */}
        </>
    )
}
export default Contact;