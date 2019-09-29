import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query PreviewPlace($providerId: String!) {
    previewPlace(providerId: $providerId) {
      ...PlacePreview
    }
  }
  ${fragments.placePreview}
`;
