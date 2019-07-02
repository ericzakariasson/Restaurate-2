import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query MePlaces {
    me {
      id
      placeCount
      places {
        ...Place
        visits {
          ...Visit
        }
      }
    }
  }
  ${fragments.user}
  ${fragments.place}
  ${fragments.visit}
`;
