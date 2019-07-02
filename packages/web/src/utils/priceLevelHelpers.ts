import { PriceLevel } from '../graphql/types';
import { formatPriceLevel } from './format';

export interface PriceLevelProps {
  value: number;
  label: string;
}

type PriceLevelMap = { [key in PriceLevel]: PriceLevelProps };

const priceLevelMap: PriceLevelMap = {
  [PriceLevel.Inexpensive]: {
    value: 1,
    label: formatPriceLevel(PriceLevel.Inexpensive)
  },
  [PriceLevel.Moderate]: {
    value: 2,
    label: formatPriceLevel(PriceLevel.Moderate)
  },
  [PriceLevel.Expensive]: {
    value: 3,
    label: formatPriceLevel(PriceLevel.Expensive)
  },
  [PriceLevel.Exclusive]: {
    value: 4,
    label: formatPriceLevel(PriceLevel.Exclusive)
  }
};

export const mapPriceLevel = (priceLevel: PriceLevel) =>
  priceLevelMap[priceLevel];

export const getFormattedPriceLevels = (): PriceLevelProps[] =>
  Object.values(PriceLevel).map(mapPriceLevel);
