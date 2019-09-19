import gql from 'graphql-tag';

export default gql`
  fragment PlaceDetailsBasic on PlaceDetailsBasic {
    providerId
    name
    address
    visits
    position {
      lat
      lng
    }
    categories
  }
`;
