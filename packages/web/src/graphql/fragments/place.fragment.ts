import gql from 'graphql-tag';

import { placeAddressFragment } from './placeAddress.fragment';
import { placeTagFragment } from './placeTag.fragment';

export const placeFragment = gql`
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
      ${placeAddressFragment}
    }
    tags {
      ${placeTagFragment}
    }
    createdAt
    updatedAt
    averageScore
    visitCount
  }
`;
