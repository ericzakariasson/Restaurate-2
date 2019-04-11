import * as React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './style';
import { SelectPlace } from './components';
import { useScript } from './hooks';

const Wrapper = styled.div`
  padding: 15px;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const GOOGLE_API_URL: string = `https://maps.googleapis.com/maps/api/js?key=${
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY
}&libraries=places`;

const App = () => {
  const [scriptLoaded, scriptError] = useScript(GOOGLE_API_URL);

  if (scriptError) {
    console.error('Error loading script');
  }

  return (
    <Wrapper>
      <Title>Restaurate</Title>
      {scriptLoaded ? <SelectPlace /> : null}
      <GlobalStyle />
    </Wrapper>
  );
};

export default App;
