import gql from 'graphql-tag';

export default gql`
  fragment PageInfo on PageInfo {
    page
    limit
    hasNextPage
  }
`;
