import { Tag } from '../../types/place';

export const SET_PLACE = 'SET_PLACE';
export const RESET_PLACE = 'RESET_PLACE';

export const SET_PRICE_LEVEL = 'SET_PRICE_LEVEL';
export const RESET_PRICE_LEVEL = 'RESET_PRICE_LEVEL';

export const ADD_TAG = 'ADD_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';

export const ADD_ORDER = 'ADD_ORDER';
export const REMOVE_ORDER = 'REMOVE_ORDER';

export const SET_RATE = 'SET_RATE';

export const SET_COMMENT = 'SET_COMMENT';

export const SET_DATE = 'SET_DATE';

export interface Rate {
  name: string;
  score: number | null;
  parent?: string;
}

export const createActions = (dispatch: any) => {
  const selectPlace = (place: google.maps.places.PlaceResult) =>
    dispatch({ type: SET_PLACE, payload: place });

  const deselectPlace = () => dispatch({ type: RESET_PLACE });

  const setPriceLevel = (priceLevel: number) =>
    dispatch({ type: SET_PRICE_LEVEL, payload: priceLevel });

  const resetPriceLevel = () => dispatch({ type: RESET_PRICE_LEVEL });

  const addTag = (tag: string) => dispatch({ type: ADD_TAG, payload: tag });

  const removeTag = (tag: string) =>
    dispatch({ type: REMOVE_TAG, payload: tag });

  const addOrder = (order: string) =>
    dispatch({ type: ADD_ORDER, payload: order });

  const removeOrder = (order: string) =>
    dispatch({ type: REMOVE_ORDER, payload: order });

  const setRate = (rate: Rate) => dispatch({ type: SET_RATE, payload: rate });

  const setComment = (comment: string) =>
    dispatch({ type: SET_COMMENT, payload: comment });

  const setDate = (date: Date) => dispatch({ type: SET_DATE, payload: date });

  return {
    selectPlace,
    deselectPlace,
    setPriceLevel,
    resetPriceLevel,
    addTag,
    removeTag,
    addOrder,
    removeOrder,
    setRate,
    setComment,
    setDate
  };
};
