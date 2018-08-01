import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './style';

import { Route, Switch, withRouter } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';

import Home from './views/Home/';
import NewVisit from './views/NewVisit/';
import NotFound from './views/NotFound';

import Menu from './components/Menu';
import { TOKEN_ID } from './constants';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: `http://localhost:${process.env.PORT}/graphql`,
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN_ID);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const App = ({ location }) => {

  const isAuthenticated = localStorage.getItem(TOKEN_ID);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <React.Fragment>
          {isAuthenticated && <Menu />}
          <Switch location={location}>
            <AuthRoute exact path="/nytt" component={NewVisit} />
            <Route exact path="/logga-in" component={Home} />
            <Route exact path="/" component={Home} />
            <Route path="/" component={NotFound} />
          </Switch>
        </React.Fragment>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default withRouter(App);