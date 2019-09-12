import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  mutation AddTag($providerPlaceId: String!, $name: String!) {
    addTag(providerPlaceId: $providerPlaceId, name: $name) {
      ...Tag
    }
  }
  ${fragments.tag}
`;
