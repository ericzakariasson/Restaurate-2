import React from 'react';
import styled from 'styled-components';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 500;
  margin-bottom: 20px;
`;

const NewVisit = () => {
  return (
    <Page>
      <Title>Plats</Title>
      <Title>Besök</Title>
    </Page>
  )
}

export default NewVisit;