import gql from 'graphql-tag';

export default gql`
  mutation ConfirmUser($token: String!) {
    confirmUser(token: $token)
  }
`;
