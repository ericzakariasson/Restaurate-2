import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import Helmet from 'react-helmet';
import { useMutation } from 'react-apollo-hooks';

import { routes } from '../../routes';
import { loader } from 'graphql.macro';

import { PlaceForm } from './components/PlaceForm';
import { VisitForm } from './components/VisitForm';
import { SearchPlace } from './components/SearchPlace';
import { Tabs } from './components';

import { addVisitReducer, initialState } from './addVisitReducer';
import { createActions } from './addVisitActions';
import { calculateAverageScore } from './addVisitHelpers';
import { toInputData } from './stateToInputData';
import { tabs } from './tabs';

const addVisitMutation = loader('../../mutations/addVisit.gql');

const meVisitsQuery = loader('../../queries/meVisits.gql');
const mePlacesQuery = loader('../../queries/mePlaces.gql');

import { AddVisit, AddVisitVariables } from '../../mutations/types/AddVisit';

const slideStyle = {
  padding: 15,
  paddingBottom: 70
} as React.CSSProperties;

const FormWrapper = styled.section``;

export const AddVisitScene = ({ history }: RouteComponentProps) => {
  const [state, dispatch] = React.useReducer(addVisitReducer, initialState);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [movingSlider, setMovingSlider] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const handleIndexChange = (index: number) => setTabIndex(index);

  const goToVisitForm = () => setTabIndex(1);

  const addVisit = useMutation<AddVisit, AddVisitVariables>(addVisitMutation, {
    refetchQueries: [{ query: meVisitsQuery }, { query: mePlacesQuery }]
  });

  const handleSave = async () => {
    setLoading(true);

    const { data, errors } = await addVisit({
      variables: {
        data: toInputData(state)
      }
    });

    if (data && data.addVisit.saved) {
      history.push(routes.visits);
    } else {
      console.error('Could not save visit');
    }

    setLoading(false);
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
