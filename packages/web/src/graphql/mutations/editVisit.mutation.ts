import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  mutation EditVisit($data: EditVisitInput!) {
    editVisit(data: $data) {
      saved
    }
  }
  ${fragments.visit}
`;
