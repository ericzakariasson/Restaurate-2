import gql from 'graphql-tag';

export default gql`
  mutation Register($data: UserRegisterInput!) {
    register(data: $data) {
      id
    }
  }
`;
