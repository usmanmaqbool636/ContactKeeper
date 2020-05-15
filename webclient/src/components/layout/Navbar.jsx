import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import AuthContext from '../../context/auth/authContext';

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, user, logout } = authContext;
    const onLogout=()=>{
        logout();
    }
    const authLink = (
        <>
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
