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
    order: 0,
    label: 'Mat',
    name: 'food',
    score: null,
    children: [
      {
        order: 0,
        name: 'taste',
        label: 'Smak',
        score: null
      },
      {
        order: 1,
        name: 'quality',
        label: 'Kvalitet',
        score: null
      }
    ]
  },
  {
    order: 1,
    name: 'service',
    label: 'Service',
    score: null
  },
  {
    order: 2,
    name: 'environment',
    label: 'Miljö',
    score: null
  },
  {
    order: 3,
    name: 'experience',
    label: 'Upplevelse',
    score: null
  }
];
