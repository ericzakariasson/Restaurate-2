import gql from 'graphql-tag';

export default gql`
  mutation RemoveTag($providerId: String!, $tagId: Float!) {
    removeTag(providerId: $providerId, tagId: $tagId)
  }
`;
