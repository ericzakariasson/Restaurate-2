import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { theme } from './style';

import Start from './views/Start';

import client from './apollo';

const App = ({ location }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Switch location={location}>
          <Route path="/" component={Start} />
        </Switch>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default withRouter(App);