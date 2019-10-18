import gql from 'graphql-tag';

import * as fragments from './';

export default gql`
  fragment Visit on Visit {
    id
    orders {
      ...VisitOrder
    }
    ratings {
      ...VisitRate
      children {
        ...VisitRate
      }
    }
    score
    user {
      ...User
    }
    images {
      ...VisitImage
    }
    comment
    visitDate
    takeAway
    private
    place {
      ...Place
    }
    createdAt
    updatedAt
  }
  ${fragments.visitOrder}
  ${fragments.visitRate}
  ${fragments.visitImage}
  ${fragments.user}
  ${fragments.place}
`;
