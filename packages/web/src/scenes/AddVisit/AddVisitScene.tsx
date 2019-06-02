import * as React from 'react';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import Helmet from 'react-helmet';

import { PlaceForm } from './components/PlaceForm';
import { VisitForm } from './components/VisitForm';
import { SearchPlace } from '../../components/SearchPlace';
import { Tabs } from './components';

import { addVisitReducer, initialState } from './addVisitReducer';
import { createActions } from './addVisitActions';

const tabs = [{ index: 0, label: 'Ställe' }, { index: 1, label: 'Besök' }];

const FormWrapper = styled.section`
  padding-bottom: 40px;
`;

export const AddVisitScene = () => {
  const [state, dispatch] = React.useReducer(addVisitReducer, initialState);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [movingSlider, setMovingSlider] = React.useState(false);

  const handleIndexChange = (index: number) => setTabIndex(index);

  const {
    selectPlace,
    deselectPlace,
    setPriceLevel,
    resetPriceLevel,
    addTag,
    removeTag,
    addOrder,
    removeOrder,
    addRate,
    removeRate
  } = createActions(dispatch);

  console.log(state);

  return (
    <>
      <Helmet>
        <title>Nytt besök</title>
      </Helmet>
      {state.place ? (
        <FormWrapper>
          <SwipeableViews
            index={tabIndex}
            onChangeIndex={handleIndexChange}
            disabled={movingSlider}
          >
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
            <VisitForm
              orders={state.orders}
              addOrder={addOrder}
              removeOrder={removeOrder}
              addRate={addRate}
              removeRate={removeRate}
              setMoving={setMovingSlider}
            />
          </SwipeableViews>
          <Tabs tabs={tabs} index={tabIndex} setIndex={setTabIndex} />
        </FormWrapper>
      ) : (
        <SearchPlace selected={state.place} setSelected={selectPlace} />
      )}
    </>
  );
};
