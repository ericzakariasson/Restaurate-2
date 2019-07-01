import gql from 'graphql-tag';

export default gql`
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
