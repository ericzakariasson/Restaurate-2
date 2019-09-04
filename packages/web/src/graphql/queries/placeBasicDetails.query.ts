import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query PlaceBasicDetails($id: String!) {
    placeBasicDetails(id: $id) {
      ...PlaceBasicDetails
    }
  }

  ${fragments.placeBasicDetails}
`;
