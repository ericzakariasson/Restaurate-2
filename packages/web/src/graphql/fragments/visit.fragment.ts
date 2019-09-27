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
  ${fragments.user}
  ${fragments.place}
`;
