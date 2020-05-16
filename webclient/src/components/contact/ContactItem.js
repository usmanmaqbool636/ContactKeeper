import React, { useContext, useState } from 'react';
import { faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactContext from '../../context/contact/contactContext';
const ContactItem = ({ contact }) => {
    const [loading, setLoading] = useState(false);
    const contactContext = useContext(ContactContext);
    const { name, _id, email, phone, type } = contact;
    const { deleteContact, setCurrent, clearCurrent } = contactContext;
    const deleteHandler = () => {
        setLoading(true)
        if(localStorage.jwttoken){

            deleteContact(_id,localStorage.jwttoken ,() => {
                setLoading(false)
            });
            clearCurrent();
        }
    }
    return (
        <div  className="card bg-light">
            <h3 className="text-primary text-left">
                {name} {" "}
                <span className={'badge ' + (type === "professional" ? "badge-success" : "badge-primary")}
                    style={{ float: "right", textTransform: "capitalize" }}
                >
                    {type}
                </span>
            </h3>
            <ul className="list">
                <li>
                    {email && <>
                        <FontAwesomeIcon icon={faEnvelopeOpen} />{" "}{email}
                    </>}
                </li>
                <li>
                    {phone && <>
                        <FontAwesomeIcon icon={faPhone} />{" "}{phone}
                    </>}
                </li>
                <button className="btn btn-dark btn-sm" onClick={() => setCurrent(contact)}>Edit</button>
                {loading ?
                    <button disabled className="btn btn-danger btn-sm">Deleting...</button>
                    :
                    <button className="btn btn-danger btn-sm" onClick={deleteHandler}>Delete</button>

                }

            </ul>
        </div >
    )
}
ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
}
export default ContactItem;