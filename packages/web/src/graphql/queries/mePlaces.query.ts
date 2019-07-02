import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query MePlaces {
    me {
      placeCount
      places {
        ... on Place {
          visits {
            ...Visit
          }
        }
      }
    }
  }
  ${fragments.user}
  ${fragments.place}
  ${fragments.visit}
`;