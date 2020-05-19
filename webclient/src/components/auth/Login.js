import React, { useState, useEffect, useContext } from 'react'

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { v4 } from "uuid";

import { Segment, Grid, Button, Icon, Header, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const Login = props => {

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const [user, setuser] = useState({
        email: "",
        password: "",
    });
    const { setAlert } = alertContext;
    const { login, error, clearError, isAuthenticated, loadUser, facebookLogin } = authContext
    useEffect(() => {
        if (error) {
            setAlert(error, "danger");
            clearError();
        }
        if (localStorage.jwttoken) {
            loadUser(localStorage.jwttoken);
        }
        if (isAuthenticated) {
            props.history.push("/");
        }
        // eslint-disable-next-line
    }, [error, localStorage.jwttoken, isAuthenticated])
    const { email, password } = user;
    const responseFacebook = (response) => {
        console.log(response);
        if (response.accessToken) {

            facebookLogin({ ...response, provider: "Facebook", email: response.email ? response.email : `${v4}@gmail.com` });
        } else {
            // setLogin(false);
        }
    }
    const changeHandler = e => setuser({ ...user, [e.target.name]: e.target.value })
    const submitHandler = e => {
        e.preventDefault();
        if (!email || !password) {
            setAlert("please fill all fields", "danger")
        }
        else {
            login({ email, password })
        }
    }
    return (
        // <Segment>
        <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>

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
                    <Segment textAlign="center">Not have an Account? please <Link to="/register">Register</Link></Segment>
                </div>
            </Grid.Column>
            <Grid.Column className="socialMedia" verticalAlign='top' textAlign="center" style={{ marginTop: "3rem" }}>
                <Container>
                    <Header as='h2'>Fourth Header</Header>
                    <p>
                        <FacebookLogin
                            appId="1306016086260001"
                            autoLoad={false}
                            fields="name,email,picture"
                            scope="public_profile,user_friends"
                            callback={responseFacebook}
                            render={(renderPprops) => (
                                <Button {...renderPprops} fluid color='facebook'>
                                    <Icon name='facebook' /> Login with Facebook
                                </Button>
                            )} />
                    </p>
                    <p>
                        <Button fluid color='google plus'>
                            <Icon name='google ' /> Google
                    </Button>
                    </p>
                </Container>
            </Grid.Column>

        </Grid>
        // </Segment >
    )
}

Login.propTypes = {

}

export default Login;
