import gql from 'graphql-tag';

export default gql`
  fragment PlaceBasicDetails on PlaceSearchItem {
    providerPlaceId
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
