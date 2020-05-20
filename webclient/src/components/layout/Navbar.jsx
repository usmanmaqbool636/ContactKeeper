import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu, Image } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';
import "./layout.css"
const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);
    const { isAuthenticated, user, logout, loadUser } = authContext;
    const { clearContact } = contactContext;
    const [activeItem, setactiveItem] = useState("home")
    useEffect(() => {
        if (localStorage.jwttoken) {
            loadUser(localStorage.jwttoken);
        }
        // eslint-disable-next-line
    }, [localStorage.jwttoken])
    const onLogout = () => {
        clearContact();
        logout();
    }
    const handleItemClick = (e, { name }) => setactiveItem(name)
    const authLink = (
        <>
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={handleItemClick}
            >
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item
                name='about'
                active={activeItem === 'about'}
                onClick={handleItemClick}
            >
                <Link to="/about">About</Link>
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item
                    name='logout'
                    active={activeItem === 'logout'}
                    onClick={handleItemClick}
                >
                    <Image src={user && (user.picture ? `${user.picture}` : `https://ui-avatars.com/api/?name=${user && user.name}`)} avatar />
                    <Dropdown direction="left" text={user && `${user.name}`}>
                        <Dropdown.Menu>
                            <Dropdown.Item icon="settings" text='Setting' />
                            <Dropdown.Item icon="log out" onClick={onLogout} text='Logout' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Menu.Menu>
        </>
    )
    const guestLink = (
        <>
            <Menu.Item
                name='about'
                active={activeItem === 'about'}
                onClick={handleItemClick}
            >
                <Link to="/about">About</Link>
            </Menu.Item>
            <Menu.Menu position='right'>

                <Menu.Item
                    name='register'
                    active={activeItem === 'register'}
                    onClick={handleItemClick}
                >
                    <Link to="/register">Register</Link>
                </Menu.Item>
                <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                >
                    <Link to="/login">Login</Link>
                </Menu.Item>
            </Menu.Menu>
        </>
    );
    return (
        <Menu color="grey" inverted secondary size="massive" style={{ padding: "0 1.5rem", backgroundColor: "#433a5f" }}  >
            <Menu.Item header style={{ color: "black" }}>
                <FontAwesomeIcon icon={faAddressCard} style={{ marginRight: "0.4rem" }} /> {title}
            </Menu.Item>
            {isAuthenticated ? authLink : guestLink}
        </Menu>
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
