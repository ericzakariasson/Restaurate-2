import { Tag } from '../../types/places';

export const SET_PLACE = 'SET_PLACE';
export const RESET_PLACE = 'RESET_PLACE';

export const SET_PRICE_LEVEL = 'SET_PRICE_LEVEL';
export const RESET_PRICE_LEVEL = 'RESET_PRICE_LEVEL';

export const ADD_TAG = 'ADD_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';

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

  return {
    selectPlace,
    deselectPlace,
    setPriceLevel,
    resetPriceLevel,
    addTag,
    removeTag
  };
};
