import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  mutation AddTag($placeId: Int!, $name: String!) {
    addTag(placeId: $placeId, name: $name) {
      ...Tag
    }
  }
  ${fragments.tag}
`;
