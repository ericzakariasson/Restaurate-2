import { PriceLevel } from '../types/graphql-global-types';
import { Visit_visit_rate } from '../queries/types/Visit';

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

type RateMap = { [key: string]: { label: string } };

const rateMap: RateMap = {
  food: {
    label: 'Mat'
  },
  service: {
    label: 'Service'
  },
  environment: {
    label: 'Miljö'
  },
  experience: {
    label: 'Upplevelse'
  }
};

export function formatRate(rate: Visit_visit_rate) {
  return Object.entries(rate)
    .filter(([key]) => key in rateMap)
    .map(([key, score]: [string, number]) => ({
      label: rateMap[key].label,
      score
    }));
}
