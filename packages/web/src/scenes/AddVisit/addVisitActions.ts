import { Tag } from '../../types/place';

export const SET_PLACE = 'SET_PLACE';
export const RESET_PLACE = 'RESET_PLACE';

export const SET_PRICE_LEVEL = 'SET_PRICE_LEVEL';
export const RESET_PRICE_LEVEL = 'RESET_PRICE_LEVEL';

export const ADD_TAG = 'ADD_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';

export const ADD_ORDER = 'ADD_ORDER';
export const REMOVE_ORDER = 'REMOVE_ORDER';

export const ENABLE_RATE_NODE = 'ENABLE_RATE_NODE';
export const DISABLE_RATE_NODE = 'DISABLE_RATE_NODE';

export const ADD_RATE = 'ADD_RATE';

export interface addRateParams {
  name: string;
  score: number;
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

  const enableRateNode = (name: string) =>
    dispatch({ type: ENABLE_RATE_NODE, payload: name });

  const disableRateNode = (name: string) =>
    dispatch({ type: DISABLE_RATE_NODE, payload: name });

  const addRate = (rate: addRateParams) =>
    dispatch({ type: REMOVE_ORDER, payload: rate });

  return {
    selectPlace,
    deselectPlace,
    setPriceLevel,
    resetPriceLevel,
    addTag,
    removeTag,
    addOrder,
    removeOrder,
    addRate,
    enableRateNode,
    disableRateNode
  };
};
