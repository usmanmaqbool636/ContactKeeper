import React, { useContext, useEffect } from 'react';
import Contact from '../contact/Contact';
import ContactForm from '../contact/ContactForm';
import ContactFilter from '../contact/ContactFilter';
import AuthContext from '../../context/auth/authContext';
const Home = (props) => {
    const authContext = useContext(AuthContext)
    const { isAuthenticated } = authContext;
    useEffect(() => {
        if(isAuthenticated){
            props.history.push("/");
        }
        // eslint-disable-next-line
    }, [localStorage.jwttoken])
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