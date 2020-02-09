import gql from 'graphql-tag';

export default gql`
  query SearchUser($term: String!, $options: PageOptions!) {
    searchUsers(term: $term, options: $options) {
      data {
        id
        name
        visitCount
        placeCount
      }
    }
  }
`;
