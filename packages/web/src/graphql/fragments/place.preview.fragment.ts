import gql from 'graphql-tag';
import * as fragments from './';

export default gql`
  fragment PlacePreview on PlacePreview {
    id
    details {
      ...PlaceDetails
    }
    wantToVisit
    placeId
  }
  ${fragments.placeDetails}
`;
