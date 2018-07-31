import React from 'react';
import styled from 'styled-components';

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 5.2rem;
  text-align: center;
  color: ${p => p.theme.action};
`;

const NotFound = () => {
  return (
    <Page>
      <Title>404</Title>
    </Page>
  )
}

export default NotFound;