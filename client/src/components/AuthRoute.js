import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { TOKEN_ID } from '../constants';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem(TOKEN_ID)
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/logga-in',
        state: { from: props.location }
      }} />
  )} />
)

export default AuthRoute;