import gql from 'graphql-tag';

export default gql`
  fragment User on User {
    id
    name
    firstName
    lastName
    roles
    email
    createdAt
    updatedAt
    placeCount
    visitCount
  }
`;
