import gql from 'graphql-tag';

export default gql`
  mutation ToggleWantToVisit($providerPlaceId: String!) {
    toggleWantToVisit(providerPlaceId: $providerPlaceId)
  }
`;
