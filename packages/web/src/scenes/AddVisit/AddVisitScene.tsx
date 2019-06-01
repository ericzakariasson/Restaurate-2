import * as React from 'react';

import { SelectedPlace } from '../../components/SelectedPlace';
import { SearchPlace } from '../../components/SearchPlace';

import { addVisitReducer, initialState } from './addVisitReducer';

import { createActions } from './addVisitActions';

export const AddVisitScene = () => {
  const [state, dispatch] = React.useReducer(addVisitReducer, initialState);

  const {
    selectPlace,
    deselectPlace,
    setPriceLevel,
    resetPriceLevel,
    addTag,
    removeTag
  } = createActions(dispatch);

  // const priceLevelIsSet = typeof statepriceLevel === 'number';
  // const isValid = priceLevelIsSet && selected && place.id && place.place_id;

  return state.place ? (
    <SelectedPlace
      place={state.place}
      deselect={deselectPlace}
      priceLevel={state.priceLevel}
      setPriceLevel={setPriceLevel}
      resetPriceLevel={resetPriceLevel}
      tags={state.tags}
      addTag={addTag}
      removeTag={removeTag}
    />
  ) : (
    <SearchPlace selected={state.place} setSelected={selectPlace} />
  );
};
