import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Login = props => {
    const [user, setuser] = useState({
        email: "",
        password: "",
    })
    const { email, password } = user;
    const changeHandler = e => setuser({ ...user, [e.target.name]: e.target.value })
    const submitHandler = e => {
        e.preventDefault();
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
