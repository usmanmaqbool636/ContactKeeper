import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types';
import AlertContext from '../../context/alert/alertContext';

const Register = props => {
    const [user, setuser] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const { name, email, password, password2 } = user;
    const changeHandler = e => setuser({ ...user, [e.target.name]: e.target.value })
    const submitHandler = e => {
        e.preventDefault();
        if (!email || !name || !password || !password2) {
            setAlert("please fill all fields", "danger");
        }
        else if (password.length < 5) {
            setAlert("password must be at least 6 characters long", "danger")
        }
        else if (password !== password2) {
            setAlert("password not match", "danger")
        }

        else {

        }
    }
    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Register </span>
            </h1>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={changeHandler} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Email Address</label>
                    <input type="email" name="email" value={email} onChange={changeHandler} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Password</label>
                    <input type="password" name="password" value={password} onChange={changeHandler} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Confirm Password</label>
                    <input type="password" name="password2" value={password2} onChange={changeHandler} />
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}

Register.propTypes = {

}

export default Register;
