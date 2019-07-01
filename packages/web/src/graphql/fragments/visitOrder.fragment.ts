import gql from 'graphql-tag';

export const visitOrderFragment = gql`
  fragment VisitOrder on Order {
    id
    createdAt
    createdAt
  }
`;
