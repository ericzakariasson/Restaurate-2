import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query MeVisits {
    visits {
      id
      score
      visitDate
      place {
        id
        providerId
        details {
          providerId
          name
          location {
            address {
              formatted
            }
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`;
