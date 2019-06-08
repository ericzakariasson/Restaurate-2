import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import { ApolloProvider } from 'react-apollo-hooks';

import { client } from './apollo';

import { GlobalStyle, theme } from './style';
import { Loading } from './components';
import { useGoogleApi } from './hooks';
import { routes } from './routes';

import { AddVisitScene, DashboardScene, VisitsScene } from './scenes';

const Wrapper = styled.div`
  height: 100%;
`;

const App = () => {
  const { ready, scriptError } = useGoogleApi(process.env
    .REACT_APP_GOOGLE_MAPS_API_KEY as string);

  if (scriptError) {
    console.error('Error loading script');
  }

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <>
            <Helmet defaultTitle="Restaurate" titleTemplate="Restaurate - %s" />
            <Wrapper>
              {ready ? (
                <Switch>
                  <Route path={routes.default} component={DashboardScene} />
                  <Route path={routes.visits} component={VisitsScene} />
                  <Route path={routes.addVisit} component={AddVisitScene} />
                </Switch>
              ) : scriptError ? (
                <h1>Ett fel har uppstått</h1>
              ) : (
                <Loading />
              )}
              <GlobalStyle />
            </Wrapper>
          </>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
