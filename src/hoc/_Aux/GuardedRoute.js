import React from 'react';
import { Route, Redirect } from "react-router-dom";
import isAuthenticated from "./authenticated"




const GuardedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('authenticated') === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

export default GuardedRoute;