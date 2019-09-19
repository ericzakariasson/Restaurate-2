import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import { ApolloProvider } from '@apollo/react-hooks';

import { client } from './apollo';

import { GlobalStyle, theme } from './style';
import { routes } from './routes';

import { AuthRoute } from './components/AuthRoute';

import {
  AddVisitScene,
  DashboardScene,
  VisitScene,
  RegisterScene,
  DefaultScene,
  LoginScene,
  MyVisitsScene,
  MyPlacesScene,
  PlaceScene,
  WantToVisitScene,
  SettingsScene,
  NotFoundScene
} from './scenes';
import { SearchPlaceScene } from 'scenes/SearchPlace/SearchPlaceScene';
import { Navigation } from 'components/Navigation';

const Wrapper = styled.div`
  height: 100%;
`;

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <>
            <Helmet defaultTitle="Restaurate" titleTemplate="Restaurate – %s" />
            <Navigation />
            <Wrapper>
              <Switch>
                <Route
                  path={routes.default}
                  component={DefaultScene}
                  exact={true}
                />
                <AuthRoute
                  path={routes.dashboard}
                  component={DashboardScene}
                  exact={true}
                />
                <Route
                  path={routes.register}
                  component={RegisterScene}
                  exact={true}
                />
                <Route
                  path={routes.login}
                  component={LoginScene}
                  exact={true}
                />
                <AuthRoute
                  path={routes.searchPlace}
                  component={SearchPlaceScene}
                  exact={true}
                />
                <AuthRoute
                  path={routes.visits}
                  component={MyVisitsScene}
                  exact={true}
                />
                <AuthRoute
                  path={routes.places}
                  component={MyPlacesScene}
                  exact={true}
                />
                <AuthRoute
                  path={routes.visit}
                  component={VisitScene}
                  exact={true}
                />
                <AuthRoute
                  path={routes.place}
                  component={PlaceScene}
                  exact={true}
                />
                <AuthRoute
                  path={routes.addVisit}
                  component={AddVisitScene}
                  exact={true}
                />
                <AuthRoute
                  path={routes.wantToVisit}
                  component={WantToVisitScene}
                  exact={true}
                />
                <AuthRoute
                  path={routes.settings}
                  component={SettingsScene}
                  exact={true}
                />
                <Route component={NotFoundScene} />
              </Switch>
              <GlobalStyle />
            </Wrapper>
          </>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
