import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const uri = `http://192.168.1.133:4000/graphql`; /* http://localhost:4000/graphql */

export const client = new ApolloClient({
  link: new HttpLink({ uri, credentials: 'include' }),
  cache: new InMemoryCache()
});
