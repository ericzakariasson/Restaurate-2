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
    address {
      ...PlaceAddress
    }
    tags {
      ...PlaceTag
    }
    createdAt
    updatedAt
    averageScore
    visitCount
  }
  ${fragments.placeAddress}
  ${fragments.placeTag}
`;
