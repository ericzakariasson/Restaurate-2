import { gql } from 'apollo-server';

export const schema = gql`
  extend type Query {
    me: User
  }

  type User {
    name: String
    email: String
  }
`;
