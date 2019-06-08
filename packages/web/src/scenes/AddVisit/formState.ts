import { rateNodes } from '../../constants';
import { createInitialRateState } from './addVisitHelpers';

export interface RateState {
  score: number | null;
  children?: RateNodeState;
}

export interface RateNodeState {
  [key: string]: RateState;
}

export interface ReducerState {
  place: google.maps.places.PlaceResult | null;
  priceLevel: number | undefined;
  tags: string[];
  orders: string[];
  rate: RateNodeState;
  comment: string;
  date: Date;
}

export const initialState = {
  place: null,
  priceLevel: undefined,
  tags: [],
  orders: [],
  rate: createInitialRateState(rateNodes),
  comment: '',
  date: new Date()
};
