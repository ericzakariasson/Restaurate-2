import gql from 'graphql-tag';

export default gql`
  fragment VisitRate on Rate {
    id
    name
    score
    calculatedScore
    createdAt
    updatedAt
  }
`;
