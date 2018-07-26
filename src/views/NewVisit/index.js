import React from 'react';
import styled from 'styled-components';

import SearchPlace from './components/SearchPlace/';
import SelectTypeOfPlace from './components/SelectTypeOfPlace';
import AddTags from './components/AddTags';
import AddOrders from './components/AddOrders';
import Rating from './components/Rating/';


const Page = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #FCFCFC;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const Title = styled.h1`
  font-size: 4.2rem;
  font-weight: 500;
  margin-bottom: 20px;
  color: #DDD;

  &:last-of-type {
    margin-top: 40px;
  }
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
`;


const types = [{ label: 'Restaurang', value: 'restaurant' }, { label: 'Café', value: 'cafe' }];

const rateTree = {
  food: {
    label: 'Mat',
    children: {
      taste: {
        label: 'Smak'
      }
    }
  }
}

const rateTree2 = [
  {
    name: 'food',
    label: 'Mat',
    children: [
      {
        name: 'taste',
        label: 'Smak'
      },
      {
        name: 'quality',
        label: 'Råvaror'
      }
    ]
  },
  {
    name: 'service',
    label: 'Service',
    children: [
      {
        name: 'treatment',
        label: 'Bemötande'
      },
      {
        name: 'knowledge',
        label: 'Kunskap'
      }
    ]
  },
  {
    name: 'experience',
    label: 'Upplevelse'
  }
]

const NewVisit = () => {
  return (
    <Page>
      <Article>
        <Title>Plats</Title>
        <SearchPlace />
        <SelectTypeOfPlace types={types} />
        <AddTags />
      </Article>
      <Article>
        <Title>Besök</Title>
        <AddOrders />
        <Rating tree={rateTree2} />
      </Article>
    </Page>
  )
}

export default NewVisit;