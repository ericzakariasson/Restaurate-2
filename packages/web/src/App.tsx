import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';

import { GlobalStyle, theme } from './style';
import { Loading } from './components';
import { AddVisitScene } from './scenes';
import { useGoogleApi } from './hooks';

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
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <>
          <Helmet defaultTitle="Restaurate" titleTemplate="Restaurate - %s" />
          <Wrapper>
            {ready ? (
              <Switch>
                <Route path="/" component={AddVisitScene} />
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
  );
};

export default App;
