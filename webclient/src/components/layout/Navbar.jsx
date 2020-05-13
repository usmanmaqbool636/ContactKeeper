import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'

const Navbar = ({ title, icon }) => {
    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} /> 
                <FontAwesomeIcon icon={faAddressCard} />{" "}
                {title}
            </h1>
            <ul>
                <li>
                    <Link to ="/">Home</Link>
                </li>
                <li>
                    <Link to ="/about">About</Link>
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
