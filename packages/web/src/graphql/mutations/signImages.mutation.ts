import gql from 'graphql-tag';

export default gql`
  mutation SignImagesData($data: SignImagesInput!) {
    signImagesData(data: $data) {
      apiUrl
      query
    }
  }
`;
