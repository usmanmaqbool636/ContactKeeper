import React, { useContext, useEffect } from 'react';
import Contact from '../contact/Contact';
import ContactForm from '../contact/ContactForm';
import ContactFilter from '../contact/ContactFilter';
import AuthContext from '../../context/auth/authContext';
const Home = (props) => {
    const authContext = useContext(AuthContext)
    // const { isAuthenticated } = authContext;
    useEffect(() => {
        document.title = "KeepContact - Home";
        // eslint-disable-next-line
    }, [])
    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contact />
            </div>
        </div>
    )
}
export default Home