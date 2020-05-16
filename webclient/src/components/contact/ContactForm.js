import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import AlertContext from '../../context/alert/alertContext';
const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const alertContext = useContext(AlertContext);

    const { addContact, current, updateContact, clearCurrent } = contactContext;
    const { setAlert } = alertContext;
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        type: "personal"
    });
    const { email, name, phone } = contact;
    useEffect(() => {
        if (current) {
            setContact(current);
        } else {
            setContact({
                name: "",
                email: "",
                phone: "",
                type: "personal"
            })
        }
    }, [current])

    const changeHandler = (e) => {
        setContact({
            ...contact, [e.target.name]: e.target.value
        })
    }
    const submitHabdler = (e) => {
        e.preventDefault();
        if (localStorage.jwttoken) {

            if (!name || !email || !phone) {
                setAlert("please fill all fields", "danger")
                return
            }
            if (current) {
                if(localStorage.jwttoken){

                    updateContact(contact,localStorage.jwttoken)
                    clearCurrent()
                }
            }
            else {
                addContact(contact,localStorage.jwttoken);
            }
            setContact({
                name: "",
                email: "",
                phone: "",
                type: "personal"
            })
        }
    }
    const clearAll = () => {
        setContact({
            name: "",
            email: "",
            phone: "",
            type: "personal"
        })
        clearCurrent()
    }
    const title = current !== null ? "Update Contact" : "Add Contact";
    return (
        <form onSubmit={submitHabdler}>
            <h2 className="text-primary">{title}</h2>
            <input type="text" placeholder="Name" name="name" value={name} onChange={changeHandler} />
            <input type="email" placeholder="Email" name="email" value={email} onChange={changeHandler} />
            <input type="text" placeholder="Phone" name="phone" value={phone} onChange={changeHandler} />
            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal" defaultChecked onChange={changeHandler} /> personal{" "}
            <input type="radio" name="type" value="professional" onChange={changeHandler} /> Professional{" "}
            <input type="submit" value={title} className="btn btn-primary" />
            <button type="button" className="btn btn-light btn-block" onClick={clearAll}>
                Clear
            </button>
        </form>
    )
}
export default ContactForm