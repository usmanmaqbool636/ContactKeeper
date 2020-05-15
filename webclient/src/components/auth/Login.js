import React, { useState, useEffect,useContext } from 'react'
import PropTypes from 'prop-types'

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = props => {

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const [user, setuser] = useState({
        email: "",
        password: "",
    })
    const { setAlert } = alertContext;
    const { login, error, clearError, isAuthenticated, loadUser } = authContext
    useEffect(() => {
        if (error) {
            setAlert(error, "danger");
            clearError();
        }
        if (localStorage.jwttoken) {
            console.log(user);
            loadUser(localStorage.jwttoken);
        }
        if (isAuthenticated) {
            props.history.push("/");
        }
        // eslint-disable-next-line
    }, [error, localStorage.jwttoken, isAuthenticated])
    const { email, password } = user;
    const changeHandler = e => setuser({ ...user, [e.target.name]: e.target.value })
    const submitHandler = e => {
        e.preventDefault();
        if(!email || !password){
            setAlert("please fill all fields","danger")
        }
        else{
            login({email,password})
        }
    }
    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Login </span>
            </h1>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="name">Email Address</label>
                    <input type="email" name="email" value={email} onChange={changeHandler} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Password</label>
                    <input type="password" name="password" value={password} onChange={changeHandler} />
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}

Login.propTypes = {

}

export default Login;
