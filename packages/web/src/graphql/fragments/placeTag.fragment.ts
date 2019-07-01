import gql from 'graphql-tag';

export default gql`
  fragment PlaceTag on Tag {
    id
    title
    createdAt
  }
`;
