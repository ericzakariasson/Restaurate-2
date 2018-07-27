import React, { Component } from 'react';
import styled from 'styled-components';

import SearchPlace from './components/SearchPlace/';
import SelectTypeOfPlace from './components/SelectTypeOfPlace';
import AddTags from './components/AddTags';
import AddOrders from './components/AddOrders';
import Rating from './components/Rating/';
import PriceLevel from './components/PriceLevel';
import Comment from './components/Comment';


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


const TYPE_OF_PLACES = [{ label: 'Restaurang', value: 'restaurant' }, { label: 'Café', value: 'cafe' }];

const RATE_TREE = [
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

const PRICE_LEVELS = [
  { value: 1, label: 'Billig' },
  { value: 2, label: 'Medel' },
  { value: 3, label: 'Dyr' },
  { value: 4, label: 'Exklusiv' },
];

const MAX_LENGTH = 160;

const initialState = {
  place: null,
  typesOfPlace: [],
  tags: [],
  priceLevel: null,
  orders: [],
  rating: null,
  comment: ''
}

class NewVisit extends Component {
  state = initialState;

  setValue = (name, value) => this.setState({ [name]: value });

  resetField = (name) => this.setState({ [name]: initialState[name] })

  render() {

    console.log('this.state: ', this.state);

    return (
      <Page>
        <Article>
          <Title>Plats</Title>
          <SearchPlace onReset={this.resetField} selected={this.state.place} onSelect={this.setValue} />
          <SelectTypeOfPlace onSelect={this.setValue} checked={this.state.typesOfPlace} types={TYPE_OF_PLACES} />
          <AddTags onAdd={this.setValue} tags={this.state.tags} />
          <PriceLevel onSelect={this.setValue} onReset={this.resetField} selected={this.state.priceLevel} priceLevels={PRICE_LEVELS} />
        </Article>
        <Article>
          <Title>Besök</Title>
          <AddOrders orders={this.state.orders} onAdd={this.setValue} />
          <Rating ratings={this.state.rating} setValue={this.setValue} tree={RATE_TREE} />
          <Comment setValue={this.setValue} maxLength={MAX_LENGTH} />
        </Article>
      </Page>
    )
  }
}

export default NewVisit;