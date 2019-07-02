import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  mutation AddVisit($data: AddVisitInput!) {
    addVisit(data: $data) {
      saved
      visit {
        ...Visit
      }
      place {
        ...Place
      }
    }
  }
  ${fragments.visit}
  ${fragments.place}
`;
