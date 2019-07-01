import gql from 'graphql-tag';

import * as fragments from './';

export default gql`
  fragment Visit on Visit {
    id
    comment
    visitDate
    orders {
      ...VisitOrder
    }
    rate {
      ...VisitRate
    }
    user {
      ...User
    }
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
