import gql from 'graphql-tag';

import * as fragments from './';

export default gql`
  fragment Place on Place {
    id
    googlePlaceId
    name
    slug
    lat
    lng
    priceLevel
    url
    types
    address {
      ...PlaceAddress
    }
    tags {
      ...PlaceTag
    }
    averageScore
    visitCount
    createdAt
    updatedAt
  }
  ${fragments.placeAddress}
  ${fragments.placeTag}
`;
