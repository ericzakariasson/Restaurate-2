import { gql, makeExecutableSchema } from 'apollo-server';

import { schema as userSchema } from './modules/user/schema';
import { resolvers as userResolvers } from './modules/user/resolvers';

const linkSchema = gql`
  type Query {
    _query: Boolean
  }
  type Mutation {
    _mutation: Boolean
  }
`;

const typeDefs = [linkSchema, userSchema];
const resolvers = {
  ...userResolvers
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
