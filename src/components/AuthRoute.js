import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem(AUTH_TOKEN)
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/logga-in',
        state: { from: props.location }
      }} />
  )} />
)

export default AuthRoute;