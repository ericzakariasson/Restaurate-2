import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query Place($id: String, $providerId: String) {
    place(id: $id, providerId: $providerId) {
      ...Place
      visits {
        ...Visit
      }
    }
  }
  ${fragments.place}
  ${fragments.visit}
`;
