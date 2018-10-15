import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

import { AUTH_TOKEN } from './constants';

const httpLink = createHttpLink({
  uri: `http://localhost:4000/graphql`,
})

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'authorization': localStorage.getItem(AUTH_TOKEN),
    }
  }));

  return forward(operation);
});

const link = ApolloLink.from([authLink, httpLink]);
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

export default client;