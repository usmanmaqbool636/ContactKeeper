import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
const PrivateRoutes = ({ component: Component, ...rest }) => {
    const authConetext = useContext(AuthContext)
    const { isAuthenticated } = authConetext;
    return (
        <Route {...rest} render={props => {
            return !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
        }} />
    )

}
export default PrivateRoutes; 