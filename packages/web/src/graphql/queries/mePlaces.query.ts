import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query MePlaces {
    places {
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
      averageScore
      visitCount
      tags {
        ...PlaceTag
      }
    }
  }
  ${fragments.placeTag}
`;
