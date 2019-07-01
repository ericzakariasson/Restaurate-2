import gql from 'graphql-tag';

export const placeAddressFragment = gql`
  fragment PlaceAddress on Address {
    id
    formatted
    street
    streetNumber
    sublocality
    city
    country
  }
`;
