import gql from 'graphql-tag';

export default gql`
  fragment VisitOrder on Order {
    id
    title
    createdAt
    updatedAt
  }
`;
