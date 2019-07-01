import gql from 'graphql-tag';

export default gql`
  fragment VisitRate on Rate {
    id
    score
    food
    service
    environment
    experience
    createdAt
    updatedAt
  }
`;
