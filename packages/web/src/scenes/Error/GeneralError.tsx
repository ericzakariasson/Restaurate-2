import * as React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
`;

const Title = styled.h1``;

const Error = styled.pre`
  max-width: 100%;
  padding: 1rem;
  background: #eee;
  font-family: monospace;
  border-radius: 0.5rem;
  margin-top: 1rem;
`;

interface GeneralErrorProps {
  error?: any;
}

const isProduction = process.env.NODE_ENV === 'production';

export const GeneralError = ({ error }: GeneralErrorProps) => {
  return (
    <Wrapper>
      <Title>Ett fel har uppstått!</Title>
      {!isProduction && <Error>{JSON.stringify(error, null, 4)}</Error>}
    </Wrapper>
  );
};
