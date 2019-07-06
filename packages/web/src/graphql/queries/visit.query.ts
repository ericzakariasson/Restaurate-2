import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query Visit($id: String!) {
    visit(id: $id) {
      ...Visit
    }
  }
  ${fragments.place}
`;
