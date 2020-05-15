import React, { useContext,useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);
    const { isAuthenticated, user, logout,loadUser } = authContext;
    const { clearContact} = contactContext;
    useEffect(()=>{
        loadUser();
    },[])
    const onLogout = () => {
        clearContact();
        logout();
    }
    const authLink = (
        <>
         <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                Hello {user && user.name}
            </li>
            <li>
                <a href="#!" onClick={onLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> <span className="hide-sm">Logout</span>
                </a>
            </li>
        </>
    )
    const guestLink = (
        <>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>

        </>
    );
    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} />
                <FontAwesomeIcon icon={faAddressCard} />{" "}
                {title}
            </h1>
            <ul>
                {isAuthenticated ? authLink : guestLink}
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}
Navbar.defaultProps = {
    title: "Contact Keeper",
    icon: "fas fa-id-card-alt"
}

export default Navbar
