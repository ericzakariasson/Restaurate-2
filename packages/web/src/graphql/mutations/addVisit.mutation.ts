import gql from 'graphql-tag';

export default gql`
  mutation AddVisit($data: AddVisitInput!) {
    addVisit(data: $data) {
      saved
    }
  }
`;
