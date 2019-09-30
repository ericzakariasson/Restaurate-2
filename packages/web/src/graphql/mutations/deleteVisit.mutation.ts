import gql from 'graphql-tag';

export default gql`
  mutation DeleteVisit($id: String!) {
    deleteVisit(id: $id)
  }
`;
