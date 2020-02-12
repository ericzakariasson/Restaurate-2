import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query User(
    $userId: Int!
    $placeOptions: PageOptions!
    $visitOptions: PageOptions!
  ) {
    user(userId: $userId) {
      ...User
      places(options: $placeOptions) {
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
        tags {
          ...Tag
        }
        averageScore
        visitCount
      }
      visits(options: $visitOptions) {
        id
        score
        visitDate
        orders {
          ...VisitOrder
        }
        images {
          id
        }
        comment
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
      }
    }
  }
  ${fragments.user}
  ${fragments.tag}
`;
