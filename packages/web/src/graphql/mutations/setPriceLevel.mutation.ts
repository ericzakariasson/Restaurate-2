import gql from 'graphql-tag';

export default gql`
  mutation SetPriceLevel($providerPlaceId: String!, $priceLevel: Float!) {
    setPriceLevel(providerPlaceId: $providerPlaceId, priceLevel: $priceLevel)
  }
`;
