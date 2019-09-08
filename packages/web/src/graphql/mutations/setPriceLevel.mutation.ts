import gql from 'graphql-tag';

export default gql`
  mutation SetPriceLevel($providerId: String!, $priceLevel: Float!) {
    setPriceLevel(providerId: $providerId, priceLevel: $priceLevel)
  }
`;
