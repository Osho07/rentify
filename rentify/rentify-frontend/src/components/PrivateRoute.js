import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getCurrentUser } from '../services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            getCurrentUser() ? (
                <Component {...props} />
            ) : (
                <Navigate to="/Login" replace />
            )
        }
    />
);

export default PrivateRoute;