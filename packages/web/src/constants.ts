import { PlaceType, PriceLevel } from './types/place';
import { RateNode } from './types/visit';

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

export const rateNodes: RateNode[] = [
  {
    name: 'Mat',
    score: 0,
    children: [
      {
        name: 'Smak',
        score: 0
      },
      {
        name: 'Kvalitet',
        score: 0
      }
    ]
  },
  {
    name: 'Service',
    score: 0
  },
  {
    name: 'Miljö',
    score: 0
  },
  {
    name: 'Upplevelse',
    score: 0
  }
];
