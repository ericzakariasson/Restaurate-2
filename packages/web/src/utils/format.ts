import { PriceLevel, PlaceType } from '../graphql/types';
import { rateNodes } from 'scenes/AddVisit/constants';

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('sv-SE', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
}

const priceLevelMap = {
  [PriceLevel.NotSet]: '–',
  [PriceLevel.Inexpensive]: 'Billig',
  [PriceLevel.Moderate]: 'Mellan',
  [PriceLevel.Expensive]: 'Dyr',
  [PriceLevel.Exclusive]: 'Exklusiv'
};

export function formatPriceLevel(priceLevel: PriceLevel | null): string {
  return priceLevel ? priceLevelMap[priceLevel] : '';
}

export function translateRateName(rateName: string) {
  const item = rateNodes.find(node => node.name === rateName);

  return item ? item.label : '';
}

type PlaceTypeMap = { [key in PlaceType]: string };

const placeTypeMap: PlaceTypeMap = {
  [PlaceType.Cafe]: 'Café',
  [PlaceType.Restaurant]: 'Restaurang'
};

export function formatPlaceType(type: PlaceType) {
  return placeTypeMap[type];
}

export function formatURL(url: string): string {
  return new URL(url).hostname;
}
