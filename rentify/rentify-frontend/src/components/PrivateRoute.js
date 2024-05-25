import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from '../services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            getCurrentUser() ? (
                <Component {...props} />
            ) : (
                <Redirect to="/Login" />
            )
        }
    />
);

export default PrivateRoute;
