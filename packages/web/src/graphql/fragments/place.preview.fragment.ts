import gql from 'graphql-tag';

export default gql`
  fragment PlacePreview on PlacePreview {
    placeId
  }
`;
