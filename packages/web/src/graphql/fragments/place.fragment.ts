import gql from 'graphql-tag';

import * as fragments from './';

export default gql`
  fragment Place on Place {
    id
    foursquareId
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
    wantToVisit
    hasVisited
    createdAt
    updatedAt
  }
  ${fragments.placeTag}
  ${fragments.placeData}
  ${fragments.user}
`;
