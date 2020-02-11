import * as React from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { addVisitRoute, routes } from 'routes';
import styled from 'styled-components';
import { Loading, NavButton, Page } from '../../components';
import { usePlaceDetailsLazyQuery } from '../../graphql/types';
import { GeneralError } from '../Error/GeneralError';
import { PlaceDetails } from './components/PlaceDetails';
import { Preview } from './components/Preview';
import { UserArea } from './components/UserArea';
import { WantToVisitButton } from './components/WantToVisitButton';

const Buttons = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
`;

export const PlaceScene = () => {
  const { providerId } = useParams();

  const [
    getPlaceDetails,
    { data, loading, error }
  ] = usePlaceDetailsLazyQuery();

  React.useEffect(() => {
    if (providerId) {
      getPlaceDetails({ variables: { providerId } });
    }
  }, [providerId, getPlaceDetails]);

  if (!providerId) {
    return <Redirect to={routes.places} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <GeneralError error={error} />;
  }

  return (
    <Page
      title={data?.placeDetails.name || '–'}
      subTitle={data?.placeDetails.location.address.formatted}
      paddingBottom
    >
      <PlaceDetails providerId={providerId} />
      <Buttons>
        <Route path={routes.myPlace} exact={true}>
          <NavButton
            text="Nytt besök"
            variant="primary"
            color="black"
            size="normal"
            to={addVisitRoute(providerId)}
          />
        </Route>
        <WantToVisitButton providerId={providerId} />
      </Buttons>
      <Switch>
        <Route path={routes.previewPlace} exact={true}>
          <Preview providerId={providerId} />
        </Route>
        <Route path={routes.userPlace} exact={true}>
          <UserArea providerId={providerId} />
        </Route>
        <Route>
          <Redirect to={routes.previewPlace} />
        </Route>
      </Switch>
    </Page>
  );
};
