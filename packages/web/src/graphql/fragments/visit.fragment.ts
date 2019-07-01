import gql from 'graphql-tag';

import { userFragment } from './user.fragment';
import { placeFragment } from './place.fragment';
import { visitOrderFragment } from './visitOrder.fragment';

export const visitFragment = gql`
  fragment Visit on Visit {
    id
    comment
    visitDate
    orders {
      ${visitOrderFragment}
    }
    rate
    user {
      ${userFragment}
    }
    place {
      ${placeFragment}
    }
    createdAt
    updatedAt
  }
`;
