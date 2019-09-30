import gql from 'graphql-tag';

export default gql`
  mutation SendConfirmationEmail($email: String!) {
    sendConfirmationEmail(email: $email)
  }
`;
