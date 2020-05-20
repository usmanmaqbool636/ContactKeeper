import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import AlertContext from '../../context/alert/alertContext';
import { Form, Radio, Header } from 'semantic-ui-react';
const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const alertContext = useContext(AlertContext);
    const [loading, setLoading] = useState(false)

    const { addContact, current, updateContact, clearCurrent } = contactContext;
    const { setAlert } = alertContext;
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        type: "personal",
        lastname: ""
    });

    useEffect(() => {
        if (current) {
            setContact(current);
        } else {
            setContact({
                name: "",
                email: "",
                phone: "",
                type: "personal",
                lastname: ""

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
                if (localStorage.jwttoken) {
                    setLoading(true)
                    updateContact(contact, localStorage.jwttoken, () => {
                        setLoading(false)
                    })
                    clearCurrent()
                }
            }
            else {
                setLoading(true)

                addContact(contact, localStorage.jwttoken, () => {
                    setLoading(false)
                });
            }
            setContact({
                name: "",
                email: "",
                phone: "",
                type: "personal",
                lastname: ""

            })
        }
    }
    const clearAll = () => {
        setContact({
            name: "",
            email: "",
            phone: "",
            type: "personal",
            lastname: ""

        })
        clearCurrent()
    }
    const title = current !== null ? "Update Contact" : "Add Contact";
    const radioChange = (e, { value }) => setContact({ ...contact, type: value })
    const { email, name, phone, lastname, type } = contact;
    return (
        <Form onSubmit={submitHabdler} style={{ marginTop: "1rem" }}>
            <Header as='h2' content={title} textAlign="center" />
            <Form.Input width="15" value={name} label="First Name" placeholder="First Name" name="name" onChange={changeHandler} />
            <Form.Input width="15" value={lastname} label="Last Name" placeholder="Last Name" name="lastname" onChange={changeHandler} />
            <Form.Input width="15" value={email} type="email" label="Email" placeholder="Email" name="email" onChange={changeHandler} />
            <Form.Input width="15" value={phone} label="Phone" placeholder="Phone" name="phone" onChange={changeHandler} />
            <Form.Group inline>
                <label>Type</label>
                <Form.Field
                    control={Radio}
                    name="type"
                    label='personal'
                    value='personal'
                    checked={type === 'personal'}
                    onChange={radioChange}
                />
                <Form.Field
                    control={Radio}
                    name="type"
                    label='professional'
                    value='professional'
                    checked={type === 'professional'}
                    onChange={radioChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Button type="button" icon="cancel" content="Clear" onClick={clearAll} />
                <Form.Button type="submit" icon="add" content={title} style={{ backgroundColor: "#003699", color: "#fff" }} disabled={loading} loading={loading} />
            </Form.Group>
        </Form>
    )
}
export default ContactForm