import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import Helmet from 'react-helmet';
import { routes } from '../../routes';

import { PlaceForm } from './components/PlaceForm';
import { VisitForm } from './components/VisitForm';
import { SearchPlace } from './components/SearchPlace';
import { Tabs } from './components';

import { addVisitReducer, initialState } from './addVisitReducer';
import { createActions } from './addVisitActions';
import { calculateAverageScore } from './addVisitHelpers';
import { toInputData } from './stateToInputData';
import { tabs } from './tabs';
import {
  useAddVisitMutation,
  MePlacesDocument,
  MeVisitsDocument
} from '../../graphql/types';
import { usePosition } from '../../hooks';
import { AskForPosition } from './components/AskForPosition';

const slideStyle = {
  padding: 20,
  paddingBottom: 70
} as React.CSSProperties;

const FormWrapper = styled.section``;

export const AddVisitScene = ({ history }: RouteComponentProps) => {
  const [state, dispatch] = React.useReducer(addVisitReducer, initialState);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [movingSlider, setMovingSlider] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const {
    position,
    askForPosition,
    error,
    rejected,
    loading: loadingPosition
  } = usePosition();

  const shouldDisplayPositionConsent =
    !position && !rejected && !loadingPosition;

  const displayLocationSearch = !position && rejected && !loadingPosition;

  const handleIndexChange = (index: number) => setTabIndex(index);
  const goToVisitForm = () => setTabIndex(1);

  const addVisit = useAddVisitMutation({
    refetchQueries: [{ query: MeVisitsDocument }, { query: MePlacesDocument }],
    awaitRefetchQueries: true
  });

  const handleSave = async () => {
    setLoading(true);

    const { data } = await addVisit({
      variables: {
        data: toInputData(state)
      }
    });

    if (data && data.addVisit.saved) {
      history.push(routes.visits);
    } else {
      console.error('Could not save visit');
      setLoading(false);
    }
  };

  const actions = createActions(dispatch);

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
              deselect={actions.deselectPlace}
              priceLevel={state.priceLevel}
              setPriceLevel={actions.setPriceLevel}
              resetPriceLevel={actions.resetPriceLevel}
              tags={state.tags}
              addTag={actions.addTag}
              removeTag={actions.removeTag}
              goToVisitForm={goToVisitForm}
            />
            <VisitForm
              orders={state.orders}
              addOrder={actions.addOrder}
              removeOrder={actions.removeOrder}
              setRate={actions.setRate}
              setMoving={setMovingSlider}
              averageScore={averageScore}
              setComment={actions.setComment}
              setDate={actions.setDate}
              saveVisit={handleSave}
            />
          </SwipeableViews>
          <Tabs tabs={tabs} index={tabIndex} setIndex={setTabIndex} />
        </FormWrapper>
      ) : (
        <>
          {shouldDisplayPositionConsent && (
            <AskForPosition confirm={askForPosition} />
          )}
          <SearchPlace
            selected={state.place}
            setSelected={actions.selectPlace}
            displayLocationSearch={displayLocationSearch}
          />
        </>
      )}
    </>
  );
};
