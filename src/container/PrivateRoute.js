// Private Route
// Redirects to login if the username in App is not set
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({
  component: Component, username, authenticated, ...rest
}) => (
  <Route
    {...rest}
    render={
      props =>
      (authenticated ? (
        <Component username={username} {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      ))
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default PrivateRoute;
