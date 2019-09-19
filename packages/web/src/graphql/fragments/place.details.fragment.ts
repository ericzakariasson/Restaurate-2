import gql from 'graphql-tag';

export default gql`
  fragment PlaceDetails on PlaceDetails {
    providerId
    name
    location {
      ...Location
    }
    categories {
      ...Category
    }
    contact {
      ...Contact
    }
    openingHours {
      ...OpeningHours
    }
  }

  fragment Location on Location {
    address {
      formatted
      house
      street
      district
      county
      country
      countryCode
      state
      city
    }
    position {
      lat
      lng
    }
  }

  fragment Contact on Contact {
    phone {
      label
      value
    }
    website {
      label
      value
    }
  }

  fragment Category on Category {
    id
    title
  }

  fragment OpeningHours on OpeningHours {
    isOpen
  }
`;
