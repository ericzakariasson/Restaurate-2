import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query MeVisits($page: Int!, $limit: Int) {
    visits(options: { page: $page, limit: $limit }) {
      pageInfo {
        ...PageInfo
      }
      data {
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
  }
  ${fragments.pageInfo}
`;
