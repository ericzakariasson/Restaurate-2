import gql from 'graphql-tag';

export const placeTagFragment = gql`
  fragment PlaceTag on Tag {
    id
    title
    createdAt
  }
`;
