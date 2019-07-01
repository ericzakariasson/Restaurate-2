import gql from 'graphql-tag';

export default gql`
  input UserRegisterInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  mutation Register($data: UserRegisterInput!) {
    register(data: $data)
  }
`;
