import gql from 'graphql-tag';

const SIGN_IN = gql`
  mutation ($tokenId: String!) {
    signIn(tokenId: $tokenId) {
      token
    }
  }
`;

export default SIGN_IN;