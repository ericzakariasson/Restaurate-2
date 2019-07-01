import gql from 'graphql-tag';

export default gql`
  input RateInput {
    food: Float
    service: Float
    environment: Float
    experience: Float
  }

  input AddVisitInput {
    comment: String
    visitDate: DateTime!
    orders: [String!]
    rate: RateInput!
    priceLevel: Float
    tags: [String!]
    types: [String!]!
    providerPlaceId: ID!
  }

  mutation AddVisit($data: AddVisitInput!) {
    addVisit(data: $data) {
      saved
    }
  }
`;
