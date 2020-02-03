import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  mutation UpdatePlace($placeId: Int!, $data: UpdatePlaceInput!) {
    updatePlace(placeId: $placeId, data: $data) {
      ...Place
    }
  }
  ${fragments.place}
`;
