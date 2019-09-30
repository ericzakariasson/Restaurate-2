import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      code
      success
      messages
      user {
        ...User
      }
    }
  }
  ${fragments.user}
`;
