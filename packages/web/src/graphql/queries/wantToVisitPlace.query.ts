import gql from 'graphql-tag';

export default gql`
  query WantToVisitPlace($providerId: String!) {
    wantToVisitPlace(providerId: $providerId)
  }
`;
