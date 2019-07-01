import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query Place($slug: String, $id: String) {
    place(slug: $slug, id: $id) {
      ... on Place {
        visits {
          ...Visit
        }
      }
    }
  }
  ${fragments.place}
  ${fragments.visit}
`;
