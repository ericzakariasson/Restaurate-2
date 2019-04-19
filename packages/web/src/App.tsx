import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './style';
import { SelectPlace, Loading } from './components';
import { useScript } from './hooks';

const Wrapper = styled.div`
  padding: 15px;
  height: 100%;
`;

const GOOGLE_API_URL: string = `https://maps.googleapis.com/maps/api/js?key=${
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY
}&libraries=places`;

const App = () => {
  const [scriptLoaded, scriptError] = useScript(GOOGLE_API_URL);

  if (scriptError) {
    console.error('Error loading script');
  }

  const ready = scriptLoaded && !scriptError;

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        {ready ? (
          <SelectPlace />
        ) : scriptError ? (
          <h1>Ett fel har uppstått</h1>
        ) : (
          <Loading />
        )}
        <GlobalStyle />
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
