import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import Helmet from 'react-helmet';
import { routes } from '../../routes';

import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import { PlaceForm } from './components/PlaceForm';
import { VisitForm } from './components/VisitForm';
import { SearchPlace } from './components/SearchPlace';
import { Tabs } from './components';

import { addVisitReducer, initialState } from './addVisitReducer';
import { createActions } from './addVisitActions';
import { calculateAverageScore } from './addVisitHelpers';

const SAVE_VISIT = gql`
  mutation SaveVisit($input: Input) {
    saveVisit(input: $input) {
      saved
    }
  }
`;

const tabs = [{ index: 0, label: 'Ställe' }, { index: 1, label: 'Besök' }];

const slideStyle = {
  padding: 15,
  paddingBottom: 70
} as React.CSSProperties;

const FormWrapper = styled.section``;

export const AddVisitScene = ({ history }: RouteComponentProps) => {
  const [state, dispatch] = React.useReducer(addVisitReducer, initialState);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [movingSlider, setMovingSlider] = React.useState(false);

  const handleIndexChange = (index: number) => setTabIndex(index);

  const goToVisitForm = () => setTabIndex(1);

  const [saveVisit, { loading, error }] = useMutation(SAVE_VISIT, {
    variables: {
      input: state
    }
  });

  const handleSave = async () => {
    await saveVisit();
    history.push(routes.visits);
  };

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

  if (loading) {
    return <h1>Sparar...</h1>;
  }

  if (error) {
    return <h1>Fel!</h1>;
  }

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
              saveVisit={handleSave}
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
