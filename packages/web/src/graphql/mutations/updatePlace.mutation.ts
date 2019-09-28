import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  mutation UpdatePlace($providerId: String!, $data: UpdatePlaceInput!) {
    updatePlace(providerId: $providerId, data: $data) {
      ...Place
    }
  }
  ${fragments.place}
`;
