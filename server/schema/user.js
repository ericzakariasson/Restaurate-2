const { gql, AuthenticationError } = require('apollo-server-express');

const typeDef  = gql`
  extend type Query {
    viewer: User
  }

  type User {
    id: ID!,
    googleId: String!
    name: String!,
    email: String!,
    picture: String,
    visits: [String],
  }
`;

const resolvers = {
  Query: {
    viewer: (_, args, { user }) => {
      if (!user) { throw new AuthenticationError('User is not logged in'); }
  
      return user;
    }
  },
  User: {
    visits: ['test']
  }
}

module.exports = {
  typeDef,
  resolvers
}

/* 
export const typeDefs = gql`
  type User {
    id: ID!
    googleId: String!
    name: String!
    email: String!
    email_verified: Boolean
    picture: String
    locale: String
  }

  type Query {
    viewer: User
  }

  type LoginMutationResponse {
    token: String!
    refreshToken: String!
    viewer: User!
  }

  type Mutation {
    login(idToken: String!): LoginMutationResponse
  }
`;
*/