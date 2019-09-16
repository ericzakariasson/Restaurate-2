import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const uri =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL
    : '/graphql';

export const client = new ApolloClient({
  link: new HttpLink({
    uri,
    credentials: 'include'
  }),
  cache: new InMemoryCache()
});
