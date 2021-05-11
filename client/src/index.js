import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import './style.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomeContainer } from './containers/HomeContainer';
import { TrackingContainer } from './containers/TrackingContainer';
import { LoginContainer } from './containers/LoginContainer';
import { SignupContainer } from './containers/SignupContainer';
import { PayPalContainer } from './containers/PayPalContainer';
import { Logout } from './components/Logout';

ReactDOM.render(
    <Router>
        <Header />
        <Switch>
            <Route path='/' component={HomeContainer} exact />
            <Route path='/track/' component={TrackingContainer} exact />
            <Route path='/track/:slug' component={TrackingContainer} exact />
            <Route path='/login/' component={LoginContainer} exact />
            <Route path='/signup/' component={SignupContainer} exact />
            <Route path='/logout/' component={Logout} exact />
            <Route path='/paypal/' component={PayPalContainer} exact />
        </Switch>
    </Router>,
    document.getElementById('root')
);
