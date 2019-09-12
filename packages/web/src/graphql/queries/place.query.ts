import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query Place($providerPlaceId: String!) {
    place(providerPlaceId: $providerPlaceId) {
      ...Place
      visits {
        ...Visit
      }
    }
  }
  ${fragments.place}
  ${fragments.visit}
`;
