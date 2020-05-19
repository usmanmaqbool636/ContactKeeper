import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './context/contact/contactState';
import AuthState from './context/auth/authState';
import AlertState from './context/alert/AlertState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alerts';
import PrivateRoute from './components/routes/privateRoutes';
import 'semantic-ui-css/semantic.min.css'
require('dotenv').config()
const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <>
              <Navbar />
              <div className="container">
                <Alert />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
