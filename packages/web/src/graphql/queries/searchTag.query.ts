import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query SearchTag($term: String!, $ignoreIds: [Int!]!) {
    searchTag(term: $term, ignoreIds: $ignoreIds) {
      ...Tag
    }
  }
  ${fragments.tag}
`;
