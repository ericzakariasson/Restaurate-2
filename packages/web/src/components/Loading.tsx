import * as React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.h1`
  color: ${p => p.theme.colors.primary.hues[0]};
`;

export const Loading = () => {
  return (
    <Background>
      <Text>Laddar...</Text>
    </Background>
  );
};
