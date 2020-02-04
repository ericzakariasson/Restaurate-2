import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  mutation RemoveTag($placeId: Int!, $id: Int!) {
    removeTag(placeId: $placeId, id: $id) {
      ...Place
    }
  }
  ${fragments.place}
`;
