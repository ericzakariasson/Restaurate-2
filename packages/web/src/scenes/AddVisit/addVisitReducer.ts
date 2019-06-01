import { Tag } from '../../types/place';

import {
  SET_PLACE,
  RESET_PLACE,
  SET_PRICE_LEVEL,
  RESET_PRICE_LEVEL,
  ADD_TAG,
  REMOVE_TAG,
  ADD_ORDER,
  REMOVE_ORDER
} from './addVisitActions';

interface ReducerState {
  place: google.maps.places.PlaceResult | null;
  priceLevel: number | undefined;
  tags: string[];
  orders: string[];
}

interface ReducerAction {
  type: string;
  payload: any;
}

export const initialState = {
  place: null,
  priceLevel: undefined,
  tags: [],
  orders: []
};

export function addVisitReducer(state: ReducerState, action: ReducerAction) {
  switch (action.type) {
    case SET_PLACE:
      return {
        ...state,
        place: action.payload
      };
    case RESET_PLACE:
      return {
        ...state,
        place: initialState.place
      };
    case SET_PRICE_LEVEL:
      return {
        ...state,
        priceLevel: action.payload
      };
    case RESET_PRICE_LEVEL:
      return {
        ...state,
        priceLevel: initialState.priceLevel
      };
    case ADD_TAG:
      return {
        ...state,
        tags: state.tags.includes(action.payload.toLowerCase())
          ? state.tags
          : [...state.tags, action.payload.toLowerCase()]
      };
    case REMOVE_TAG:
      return {
        ...state,
        tags: state.tags.filter((tag: string) => tag !== action.payload)
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: state.orders.includes(action.payload.toLowerCase())
          ? state.orders
          : [...state.orders, action.payload.toLowerCase()]
      };
    case REMOVE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order: string) => order !== action.payload)
      };
    default:
      throw new Error();
  }
}
