import { PlaceType, PriceLevel } from './types/places';

export const placeTypes: PlaceType[] = [
  {
    label: 'Restauranger',
    value: 'restaurant'
  },
  {
    label: 'Caféer',
    value: 'cafe'
  }
];

export const priceLevels: PriceLevel[] = [
  {
    name: 'Billig',
    level: 0
  },
  {
    name: 'Medel',
    level: 1
  },
  {
    name: 'Dyr',
    level: 2
  },
  {
    name: 'Exklusiv',
    level: 3
  }
];
