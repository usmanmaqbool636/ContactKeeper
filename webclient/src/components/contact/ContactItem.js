import React, { useContext, useState } from 'react';
import { Button, Accordion, Icon, Container, Image, Rating } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';


const ContactItem = ({ contact, id, activeIndex, handleActiveClick }) => {
    const [loading, setLoading] = useState(false);
    const contactContext = useContext(ContactContext);
    const { name, lastname, _id, email, phone, type } = contact;
    const { deleteContact, setCurrent, clearCurrent, favourite } = contactContext;
    const deleteHandler = () => {
        setLoading(true)
        if (localStorage.jwttoken) {
            deleteContact(_id, localStorage.jwttoken, () => {
                setLoading(false)
            });
            clearCurrent();
        }
    }
    const rateHandler = () => {
        if(localStorage.jwttoken){
            favourite(contact._id,localStorage.jwttoken)
        }
    }
    return (
        <Accordion fluid styled style={{ backgroundColor: "#f4f4f4", marginBottom: "0.4rem" }}>

            <Accordion.Title
                style={{ color: "black" }}
                active={activeIndex === id}
                index={0}
                onClick={() => handleActiveClick(id)}
            >

                <Icon name='dropdown' />
                <Image src={contact.picture ? `${contact.picture}` : `https://ui-avatars.com/api/?name=${name}`} avatar />

                {name} {" "} {lastname}
                <Rating maxRating={1} rating={contact.favourite} icon='star' size='large' onRate={rateHandler} />
                <span className={'badge ' + (type === "professional" ? "badge-success" : "badge-primary")}
                    style={{ float: "right", textTransform: "capitalize", margin: "auto", marginTop: "-3px" }}
                >
                    {type}
                </span>
            </Accordion.Title>

            <Accordion.Content active={activeIndex === id}>
                <p>
                    <Icon name="mail" /> {email}
                </p>
                <p>
                    <Icon name="phone" /> {phone}
                </p>
                <Container fluid textAlign="justified">
                    <p>
                        <Button
                            color="black"
                            size="mini"
                            onClick={() => setCurrent(contact)}
                            content="Edit"
                            icon="edit"
                        />

                        <Button
                            disabled={loading}
                            loading={loading}
                            color="red"
                            size="mini"
                            onClick={deleteHandler}
                            content="Delete"
                            icon="user delete"
                        />
                    </p>
                </Container>
            </Accordion.Content>
        </Accordion>
    )
}
ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
}
export default ContactItem;