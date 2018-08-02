import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

import { TOKEN_ID } from './constants';

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
  cache: new InMemoryCache(),
});

export default client;