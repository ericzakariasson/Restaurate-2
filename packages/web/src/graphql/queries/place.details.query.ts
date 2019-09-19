import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query PlaceDetails($providerId: String!) {
    placeDetails(providerId: $providerId) {
      ...PlaceDetails
    }
  }
  ${fragments.placeDetails}
`;
