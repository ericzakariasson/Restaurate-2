import gql from 'graphql-tag';

export default gql`
  mutation RemoveTag($providerPlaceId: String!, $tagId: Float!) {
    removeTag(providerPlaceId: $providerPlaceId, tagId: $tagId)
  }
`;
