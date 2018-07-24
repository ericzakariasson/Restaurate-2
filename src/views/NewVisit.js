import React from 'react';
import styled from 'styled-components';

import SearchPlace from '../components/SearchPlace/';
import TypeOfPlace from '../components/TypeOfPlace';
import Tags from '../components/Tags';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #FCFCFC;
  min-height: 100vh;
  position: relative;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 500;
  margin-bottom: 20px;
  color: #DDD;
`;

const NewVisit = () => {
  return (
    <Page>
      <Title>Plats</Title>
      <SearchPlace />
      <TypeOfPlace />
      <Tags />
    </Page>
  )
}

export default NewVisit;