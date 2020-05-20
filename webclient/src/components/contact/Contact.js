import React, { useContext, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from '../contact/ContactItem';
import Spinner from '../layout/spinner/Spinner';
import { Tab } from 'semantic-ui-react';
import './Contact.css';

const Contact = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered, getAllContact } = contactContext;
    const [loading, setLoading] = useState(true)

    const [activeIndex, setactiveIndex] = useState(-1)
    const filterContacts = filtered ? filtered : contacts
    const animTime = filtered ? 200 : 500;
    const handleActiveClick = (id) => {
        if (activeIndex === id) {
            setactiveIndex(-1)
        }
        else {
            setactiveIndex(id);
        }
    }
    useEffect(() => {
        setLoading(true);
        if (localStorage.jwttoken) {
            getAllContact(localStorage.jwttoken, () => {
                setLoading(false)
            });
        }
        // eslint-disable-next-line
    }, [localStorage.jwttoken])
    if (loading) {
        return <Spinner size="massive" />
    }
    else if (contacts.length === 0) {
        return <h4>Please Add Contact</h4>
    }
    else {
        const favourite = filterContacts.filter(c => c.favourite === true);
        const panes = [
            {
                menuItem: 'All',
                render: () => <TransitionGroup>
                    {filterContacts.map((contact, id) => {
                        return (
                            <CSSTransition key={contact._id} timeout={animTime} classNames="item">
                                <ContactItem id={id} activeIndex={activeIndex} handleActiveClick={handleActiveClick} contact={contact} />
                            </CSSTransition>
                        )
                    })}
                </TransitionGroup>,
            },
            {
                menuItem: 'Favourite',
                render: () => {
                   return favourite.map((contact, id) => {
                        return <ContactItem key={contact._id} id={id} activeIndex={activeIndex} handleActiveClick={handleActiveClick} contact={contact} />
                    })
                },
            }
        ]



        return (
            <>
                <Tab menu={{ pointing: true }} panes={panes} />
            </ >
        )
    }
}
export default Contact;