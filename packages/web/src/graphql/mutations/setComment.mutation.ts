import gql from 'graphql-tag';

export default gql`
  mutation SetComment($providerId: String!, $comment: String!) {
    setComment(providerId: $providerId, comment: $comment)
  }
`;
