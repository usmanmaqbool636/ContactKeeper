import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { Segment, Grid, Button, Icon, Header, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { v4 } from "uuid";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';


const Register = props => {
    //facebook start
    // const [login, setLogin] = useState(false);
    // const [data, setData] = useState({});
    // const [picture, setPicture] = useState('');


    const [user, setuser] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { setAlert } = alertContext;
    const { register, error, clearError, isAuthenticated, loadUser, facebookLogin, gooleLogin } = authContext
    const { name, email, password, password2 } = user;
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

    const responseFacebook = (response) => {
        console.log(response);
        if (response.accessToken) {

            facebookLogin({ ...response, provider: "Facebook", email: response.email ? response.email : `${v4}@gmail.com` });
        } else {
            // setLogin(false);
        }
    }
    const responseGoogle = (response) => {

        gooleLogin({ ...response.profileObj, provider: "Google" });
        console.log(response);
    }
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
            register({ email, name, password });
        }
    }
    return (
        // <Segment>
        <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
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
                    <Segment textAlign="center">Already have an Account? go to <Link to="/login">Login</Link></Segment>
                </div>
            </Grid.Column>
            <Grid.Column className="socialMedia" verticalAlign='top' textAlign="center" style={{ marginTop: "3rem" }}>
                <Container>
                    <Header as='h2'>Fourth Header</Header>
                    <p>
                        <FacebookLogin
                            appId={process.env.REACT_APP_FB}
                            autoLoad={false}
                            fields="name,email,picture"
                            scope="public_profile,user_friends"
                            callback={responseFacebook}
                            render={(renderPprops) => (
                                <Button {...renderPprops} fluid color='facebook'>
                                    <Icon name='facebook' /> register using Facebook
                                </Button>
                            )} />

                    </p>
                    <p>
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE}
                            render={renderProps => (
                                <Button {...renderProps} fluid color='google plus'>
                                    <Icon name='google ' /> Register Using Google
                                </Button>
                            )}
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </p>
                </Container>
            </Grid.Column>
        </Grid>
        // </Segment>
    )
}

Register.propTypes = {

}

export default Register;
