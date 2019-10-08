import gql from 'graphql-tag';

export default gql`
  fragment VisitImage on VisitImage {
    id
    url
    publicId
    orders {
      id
      title
    }
  }
`;
