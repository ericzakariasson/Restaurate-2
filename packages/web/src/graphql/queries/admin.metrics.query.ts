import gql from 'graphql-tag';

export default gql`
  query Metrics {
    metrics {
      registeredUsers
      confirmedUsers
      activeUsers
    }
  }
`;
