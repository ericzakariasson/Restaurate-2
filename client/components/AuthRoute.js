import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ACCESS_TOKEN, USER_DATA } from '../constants';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem(ACCESS_TOKEN) && localStorage.getItem(USER_DATA)
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/logga-in',
        state: { from: props.location }
      }} />
  )} />
)

export default AuthRoute;