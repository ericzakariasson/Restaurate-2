import * as React from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { addVisitRoute, routes } from 'routes';
import styled from 'styled-components';
import { Loading, NavButton, Page } from '../../components';
import { PlaceQueryVariables, usePlaceDetailsQuery } from '../../graphql/types';
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
  const { providerId, userId } = useParams();
  const isPreview = useRouteMatch({ path: routes.previewPlace });
  const isMe = useRouteMatch({ path: routes.myPlace });

  const variables: PlaceQueryVariables = {
    providerId
  };

  if (!isPreview && !isMe) {
    variables.userId = userId;
  }

  const { data, loading, error } = usePlaceDetailsQuery({ variables });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <GeneralError />;
  }

  const details = data && data.placeDetails;
  const { name, location } = details!;

  return (
    <Page title={name} subTitle={location.address.formatted} paddingBottom>
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
