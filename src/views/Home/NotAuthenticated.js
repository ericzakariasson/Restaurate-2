import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import { Transition, config } from 'react-spring'

import Landing from './Landing';
import LandingInfo from './LandingInfo';

import Login from '../Login';

const NotAuthenticated = ({ location }) => {

  const isLoginPath = location.pathname === '/logga-in';
  const state = isLoginPath ? 'login' : 'default';

  return (
    <Fragment>
      <Landing state={state} />
      <Transition
        native
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
        config={config.slow}
      >
        {
          isLoginPath
            ? style => <Login style={style} />
            : style => <LandingInfo style={style} />
        }
      </Transition>
    </Fragment>
  )
}

export default withRouter(NotAuthenticated);