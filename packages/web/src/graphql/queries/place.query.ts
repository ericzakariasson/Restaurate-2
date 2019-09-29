import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query Place($providerId: String!, $userId: String) {
    place(providerId: $providerId, userId: $userId) {
      ...Place
      visits {
        ...Visit
      }
    }
  }
  ${fragments.place}
  ${fragments.visit}
`;
