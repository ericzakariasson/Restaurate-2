const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    viewer: User
  }

  extend type Mutation {
    signUp(
      tokenId: String!
    ): Token!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!,
    googleId: String!
    name: String!,
    email: String!,
    picture: String,
    visits: [Visit!],
  }
`;