import gql from 'graphql-tag';

export default gql`
  fragment PlaceDetailsBasic on PlaceDetailsBasic {
    providerId
    name
    address
    visits
    hasPlace
    position {
      lat
      lng
    }
    categories
  }
`;
