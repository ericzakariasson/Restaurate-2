import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query SearchPlace($filter: PlaceSearchInput!) {
    searchPlace(filter: $filter) {
      places {
        ...PlaceBasicDetails
      }
    }
  }
  ${fragments.placeBasicDetails}
`;
