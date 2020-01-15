import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query MePlaces($page: Int!, $limit: Int!) {
    places(options: { page: $page, limit: $limit }) {
      pageInfo {
        page
        limit
        hasNextPage
      }
      data {
        id
        providerId
        details {
          name
          location {
            address {
              formatted
            }
          }
        }
        averageScore
        visitCount
        tags {
          ...PlaceTag
        }
      }
    }
  }
  ${fragments.placeTag}
`;
