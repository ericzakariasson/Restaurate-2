import gql from 'graphql-tag';

import * as fragments from './';

export default gql`
  fragment Place on Place {
    id
    foursquareId
    slug
    priceLevel
    types
    averageScore
    visitCount
    tags {
      ...PlaceTag
    }
    data {
      ...PlaceData
    }
    user {
      ...User
    }
    createdAt
    updatedAt
  }
  ${fragments.placeTag}
  ${fragments.placeData}
  ${fragments.user}
`;
