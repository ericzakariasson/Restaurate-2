import { Tag } from '../../types/places';

import {
  SET_PLACE,
  RESET_PLACE,
  SET_PRICE_LEVEL,
  RESET_PRICE_LEVEL,
  ADD_TAG,
  REMOVE_TAG
} from './addVisitActions';

interface ReducerState {
  place: google.maps.places.PlaceResult | null;
  priceLevel: number | undefined;
  tags: string[];
}

interface ReducerAction {
  type: string;
  payload: any;
}

export const initialState = {
  place: null,
  priceLevel: undefined,
  tags: []
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
    default:
      throw new Error();
  }
}
