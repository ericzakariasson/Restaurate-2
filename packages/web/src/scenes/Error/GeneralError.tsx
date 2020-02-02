import * as React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

const Title = styled.h1``;

const Error = styled.code`
  max-width: 100%;
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
