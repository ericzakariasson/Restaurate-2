import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query PlaceBasicDetails($providerPlaceId: String!) {
    placeBasicDetails(providerPlaceId: $providerPlaceId) {
      ...PlaceBasicDetails
    }
  }

  ${fragments.placeBasicDetails}
`;
