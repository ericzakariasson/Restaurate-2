import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query Visit($id: Float!) {
    visit(id: $id) {
      ...Visit
    }
  }
  ${fragments.place}
`;
