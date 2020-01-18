import * as React from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { addVisitRoute, routes } from 'routes';
import styled from 'styled-components';
import { Loading, NavButton, Page } from '../../components';
import { usePlaceDetailsLazyQuery } from '../../graphql/types';
import { GeneralError } from '../Error/GeneralError';
import { Details } from './components/Details';
import { Preview } from './components/Preview';
import { UserArea } from './components/UserArea';
import { WantToVisitButton } from './components/WantToVisitButton';

const Buttons = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(3px);
  border-top: 1px solid #eee;
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
    return <GeneralError />;
  }

  return (
    <Page
      title={data?.placeDetails.name || '–'}
      subTitle={data?.placeDetails.location.address.formatted}
      paddingBottom
    >
      <Details providerId={providerId} />
      <Switch>
        <Route path={routes.previewPlace} exact={true}>
          <Preview providerId={providerId} />
        </Route>
        <Route path={routes.myPlace} exact={true}>
          <UserArea providerId={providerId} />
        </Route>
      </Switch>
      <Buttons>
        <WantToVisitButton providerId={providerId} />
        <NavButton
          text="Nytt besök"
          variant="primary"
          size="normal"
          to={addVisitRoute(providerId)}
        />
      </Buttons>
    </Page>
  );
};
