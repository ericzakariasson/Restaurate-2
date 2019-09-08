import gql from 'graphql-tag';

export default gql`
  mutation ToggleWantToVisit($providerId: String!) {
    toggleWantToVisit(providerId: $providerId)
  }
`;
