import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query Place($providerId: String!) {
    place(providerId: $providerId) {
      ...Place
      visits {
        ...Visit
      }
    }
  }
  ${fragments.place}
  ${fragments.visit}
`;
