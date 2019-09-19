import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query SearchPlace($query: String!, $position: PositionInput) {
    searchPlace(query: $query, position: $position) {
      places {
        ...PlaceDetailsBasic
      }
    }
  }
  ${fragments.placeDetailsBasic}
`;
