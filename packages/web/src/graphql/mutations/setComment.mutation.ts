import gql from 'graphql-tag';

export default gql`
  mutation SetComment($providerPlaceId: String!, $comment: String!) {
    setComment(providerPlaceId: $providerPlaceId, comment: $comment)
  }
`;
