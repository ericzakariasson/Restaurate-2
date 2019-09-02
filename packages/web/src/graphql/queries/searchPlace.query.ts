import gql from 'graphql-tag';

export default gql`
  query SearchPlace($filter: PlaceSearchInput!) {
    searchPlace(filter: $filter) {
      places {
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
    }
  }
`;
