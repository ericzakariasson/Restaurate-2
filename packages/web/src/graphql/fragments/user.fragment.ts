import gql from 'graphql-tag';

export const userFragment = gql`
  fragment User on User {
    id
    name
    firstName
    lastName
    role
    email
    createdAt
    updatedAt
    placeCount
    visitCount
  }
`;
