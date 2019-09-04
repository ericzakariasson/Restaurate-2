import gql from 'graphql-tag';

export default gql`
  fragment PlaceBasicDetails on PlaceSearchItem {
    foursquareId
    name
    address
    visits
    coordinates {
      lat
      lng
    }
    types
  }
`;
