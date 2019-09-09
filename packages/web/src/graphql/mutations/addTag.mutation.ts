import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  mutation AddTag($providerId: String!, $name: String!) {
    addTag(providerId: $providerId, name: $name) {
      ...Tag
    }
  }
  ${fragments.tag}
`;
