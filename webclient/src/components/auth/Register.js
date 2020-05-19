import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { Segment, Grid, Button, Icon, Header, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const Register = props => {
    const [user, setuser] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { setAlert } = alertContext;
    const { register, error, clearError, isAuthenticated, loadUser } = authContext
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
                            <Button fluid color='facebook'>
                                <Icon name='facebook' /> Facebook
                    </Button>
                        </p>
                        <p>
                            <Button fluid color='google plus'>
                                <Icon name='google ' /> Google
                    </Button>
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
