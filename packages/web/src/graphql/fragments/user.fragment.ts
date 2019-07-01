import gql from 'graphql-tag';

export default gql`
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
