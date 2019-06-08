import * as React from 'react';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import Helmet from 'react-helmet';

import { PlaceForm } from './components/PlaceForm';
import { VisitForm } from './components/VisitForm';
import { SearchPlace } from './components/SearchPlace';
import { Tabs } from './components';

import { addVisitReducer, initialState } from './addVisitReducer';
import { createActions } from './addVisitActions';
import { calculateAverageScore } from './addVisitHelpers';

const tabs = [{ index: 0, label: 'Ställe' }, { index: 1, label: 'Besök' }];

const slideStyle = {
  padding: 15,
  paddingBottom: 70
} as React.CSSProperties;

const FormWrapper = styled.section``;

export const AddVisitScene = () => {
  const [state, dispatch] = React.useReducer(addVisitReducer, initialState);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [movingSlider, setMovingSlider] = React.useState(false);

  const handleIndexChange = (index: number) => setTabIndex(index);

  const goToVisitForm = () => setTabIndex(1);

  const saveVisit = () => {};

  const {
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
  } = createActions(dispatch);

  const averageScore = calculateAverageScore(state);

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
            slideStyle={slideStyle}
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
              goToVisitForm={goToVisitForm}
            />
            <VisitForm
              orders={state.orders}
              addOrder={addOrder}
              removeOrder={removeOrder}
              setRate={setRate}
              setMoving={setMovingSlider}
              averageScore={averageScore}
              setComment={setComment}
              setDate={setDate}
              saveVisit={saveVisit}
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
