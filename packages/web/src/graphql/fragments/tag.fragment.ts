import gql from 'graphql-tag';

export default gql`
  fragment Tag on Tag {
    id
    name
    createdAt
    updatedAt
  }
`;
