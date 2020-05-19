import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/spinner/Spinner';
const PrivateRoutes = ({ component: Component, ...rest }) => {
    const authConetext = useContext(AuthContext)
    const { isAuthenticated } = authConetext;
    if (isAuthenticated !== null) {
        return <Route {...rest} render={props => {
            return isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
        }} />
    }
    else {
        return (
            <Spinner size="massive" />
        )
    }

}
export default PrivateRoutes; 