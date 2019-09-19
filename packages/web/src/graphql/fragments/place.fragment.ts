import gql from 'graphql-tag';

import * as fragments from './';

export default gql`
  fragment Place on Place {
    id
    providerId
    priceLevel
    types
    averageScore
    visitCount
    tags {
      ...PlaceTag
    }
    details {
      ...PlaceDetails
    }
    user {
      ...User
    }
    comment
    wantToVisit
    hasVisited
    createdAt
    updatedAt
  }
  ${fragments.placeTag}
  ${fragments.placeDetails}
  ${fragments.user}
`;
