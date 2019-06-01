import * as React from 'react';

import SwipeableViews from 'react-swipeable-views';

import { PlaceForm } from '../../components/PlaceForm';
import { VisitForm } from '../../components/VisitForm';
import { SearchPlace } from '../../components/SearchPlace';

import { Tabs } from './components';

import { addVisitReducer, initialState } from './addVisitReducer';
import { createActions } from './addVisitActions';

const tabs = [{ index: 0, label: 'Ställe' }, { index: 1, label: 'Besök' }];

export const AddVisitScene = () => {
  const [state, dispatch] = React.useReducer(addVisitReducer, initialState);
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleIndexChange = (index: number) => setTabIndex(index);

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
    <>
      <SwipeableViews index={tabIndex} onChangeIndex={handleIndexChange}>
        <PlaceForm
          place={state.place}
          deselect={deselectPlace}
          priceLevel={state.priceLevel}
          setPriceLevel={setPriceLevel}
          resetPriceLevel={resetPriceLevel}
          tags={state.tags}
          addTag={addTag}
          removeTag={removeTag}
        />
        <VisitForm />
      </SwipeableViews>
      <Tabs tabs={tabs} index={tabIndex} setIndex={setTabIndex} />
    </>
  ) : (
    <SearchPlace selected={state.place} setSelected={selectPlace} />
  );
};
