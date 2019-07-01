import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query MeVisits {
    me {
      visitCount
      visits {
        ...Visit
      }
    }
  }
  ${fragments.visit}
`;
