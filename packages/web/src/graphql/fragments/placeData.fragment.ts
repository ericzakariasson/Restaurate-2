import gql from 'graphql-tag';

export default gql`
  fragment PlaceData on PlaceData {
    id
    name
    contact {
      ...Contact
    }
    location {
      ...Location
    }
    url
    description
  }

  fragment Location on Location {
    address
    crossStreet
    lat
    lng
    distance
    postalCode
    cc
    city
    state
    country
    formattedAddress
  }

  fragment Contact on Contact {
    phone
    formattedPhone
    twitter
    instagram
    facebook
    facebookUsername
    facebookName
  }
`;
