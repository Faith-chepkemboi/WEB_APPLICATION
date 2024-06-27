import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                const token = sessionStorage.getItem('accessToken');
                if (!token) {
                    // If no token, redirect to the login page
                    return <Redirect to="/" />;
                } else {
                    // If token exists, render the requested component
                    return <Component {...props} />;
                }
            }}
        />
    );
};

export default PrivateRoute;
