import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  mutation AddVisit($data: AddVisitInput!) {
    addVisit(data: $data) {
      saved
    }
  }
  ${fragments.visit}
  ${fragments.place}
`;
