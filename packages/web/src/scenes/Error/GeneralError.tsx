import * as React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1``;

export const GeneralError = () => {
  return (
    <Wrapper>
      <Title>Ett fel har uppstått!</Title>
    </Wrapper>
  );
};
