import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { theme } from './style';

import Landing from './views/Landing';
import SignIn from './views/SignIn';

import client from './apollo';

const App = ({ location }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Switch location={location}>
          <Route exact path="/logga-in" component={SignIn} />
          <Route exact path="/" component={Landing} />
        </Switch>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default withRouter(App);