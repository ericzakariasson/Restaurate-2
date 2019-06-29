import { PriceLevel } from '../types/graphql-global-types';

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('sv-SE', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
}

const priceLevelMap = {
  [PriceLevel.Cheap]: 'Billig',
  [PriceLevel.Medium]: 'Mellan',
  [PriceLevel.Expensive]: 'Dyr',
  [PriceLevel.Exclusive]: 'Exklusiv'
};

export function formatPriceLevel(priceLevel: PriceLevel | null) {
  return priceLevel ? priceLevelMap[priceLevel] : null;
}
