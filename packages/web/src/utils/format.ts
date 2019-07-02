import { Rate, PriceLevel, PlaceType } from '../graphql/types';

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('sv-SE', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
}

const priceLevelMap = {
  [PriceLevel.Free]: 'Gratis',
  [PriceLevel.Inexpensive]: 'Billig',
  [PriceLevel.Moderate]: 'Mellan',
  [PriceLevel.Expensive]: 'Dyr',
  [PriceLevel.Exclusive]: 'Exklusiv'
};

export function formatPriceLevel(priceLevel: PriceLevel | null): string {
  return priceLevel ? priceLevelMap[priceLevel] : '';
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

interface FormattedRate {
  label: string;
  score: number;
}

export function formatRate(rate: Rate): FormattedRate[] {
  return Object.entries(rate)
    .filter(([key]) => key in rateMap)
    .map(([key, score]: [string, number]) => ({
      label: rateMap[key].label,
      score
    }));
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
