import * as React from 'react';
import { Page } from 'components';
import styled from 'styled-components';
import { Frown } from 'react-feather';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 20px;
`;

export const NotFoundScene = () => {
  return (
    <Page title="" center>
      <Wrapper>
        <Frown size={48} />
        <Title>Oops, testa en annan sida</Title>
      </Wrapper>
    </Page>
  );
};
