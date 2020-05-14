import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './components/context/contact/contactState';

function App() {
  return (
    <ContactState>
      <Router>
        <>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />

            </Switch>
          </div>
        </>
      </Router>
    </ContactState>
  );
}

export default App;
