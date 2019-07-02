import { registerEnumType } from 'type-graphql';

export enum PriceLevel {
  Inexpensive = 1,
  Moderate = 2,
  Expensive = 3,
  Exclusive = 4
}

registerEnumType(PriceLevel, {
  name: 'PriceLevel',
  description: 'Price level of place'
});

type PriceLevelMap = { [key: number]: PriceLevel };

export const priceLevelMap: PriceLevelMap = {
  1: PriceLevel.Inexpensive,
  2: PriceLevel.Moderate,
  3: PriceLevel.Expensive,
  4: PriceLevel.Exclusive
};
