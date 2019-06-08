import * as React from 'react';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import Helmet from 'react-helmet';
import { Formik } from 'formik';

import { PlaceForm } from './components/PlaceForm';
import { VisitForm } from './components/VisitForm';
import { SearchPlace } from './components/SearchPlace';
import { Tabs } from './components';

import { initialState } from './formState';
import { calculateAverageScore } from './addVisitHelpers';

const tabs = [{ index: 0, label: 'Ställe' }, { index: 1, label: 'Besök' }];

const slideStyle = {
  padding: 15,
  paddingBottom: 70,
  maxHeight: '100vh'
};

const FormWrapper = styled.section``;

export const AddVisitScene = () => {
  const [
    place,
    setPlace
  ] = React.useState<google.maps.places.PlaceResult | null>(null);
  const selectPlace = (place: google.maps.places.PlaceResult) =>
    setPlace(place);
  const deselectPlace = () => setPlace(null);

  const [tabIndex, setTabIndex] = React.useState(0);
  const [movingSlider, setMovingSlider] = React.useState(false);

  const handleIndexChange = (index: number) => setTabIndex(index);

  const goToVisitForm = () => setTabIndex(1);

  return (
    <>
      <Helmet>
        <title>Nytt besök</title>
      </Helmet>
      {place ? (
        <FormWrapper>
          <Formik
            initialValues={initialState}
            onSubmit={() => {
              console.log('submit');
            }}
          >
            {({ values, handleChange }) => {
              console.log(values);

              return (
                <SwipeableViews
                  index={tabIndex}
                  onChangeIndex={handleIndexChange}
                  disabled={movingSlider}
                  slideStyle={slideStyle}
                >
                  <PlaceForm
                    place={place}
                    deselect={deselectPlace}
                    priceLevel={values.priceLevel}
                    tags={values.tags}
                    handleChange={handleChange}
                    goToVisitForm={goToVisitForm}
                  />
                  <VisitForm
                    orders={values.orders}
                    setRate={(a: any) => {}}
                    setMoving={setMovingSlider}
                    averageScore={0}
                    setComment={(a: any) => {}}
                    setDate={(a: any) => {}}
                  />
                </SwipeableViews>
              );
            }}
          </Formik>
          <Tabs tabs={tabs} index={tabIndex} setIndex={setTabIndex} />
        </FormWrapper>
      ) : (
        <SearchPlace selected={place} setSelected={selectPlace} />
      )}
    </>
  );
};
