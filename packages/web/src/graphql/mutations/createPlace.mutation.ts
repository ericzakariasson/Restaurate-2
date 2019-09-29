import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  mutation CreatePlace($providerId: String!) {
    createPlace(providerId: $providerId) {
      ...Place
    }
  }
  ${fragments.place}
`;
