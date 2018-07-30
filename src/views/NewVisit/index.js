import React, { Component } from 'react';
import styled from 'styled-components';

import { Transition, animated, config } from 'react-spring';

import SearchPlace from './components/SearchPlace/';
import SelectTypeOfPlace from './components/SelectTypeOfPlace';
import Tags from './components/Tags';
import Orders from './components/Orders';
import Rating from './components/Rating/';
import PriceLevel from './components/PriceLevel';
import Comment from './components/Comment';

import Loading from '../../components/Loading';

import { 
  TYPE_OF_PLACES, 
  RATE_TREE, 
  PRICE_LEVELS,
  COMMENT_MAX_LENGTH,
} from './defaults';

const Page = styled(animated.section)`
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

const SubmitButton = styled.button`
  width: 100%;
  padding: 20px;
  margin-top: 40px;
  background: ${p => p.theme.action};
  color: #FFF;
  font-size: 2.4rem;
  border-radius: 5px;
  box-shadow: ${p => p.theme.boxShadow};
  font-family: ${p => p.theme.fonts.text};
  cursor: pointer;
`;

const LoadingWrapper = styled(animated.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const initialState = {
  place: null,
  typesOfPlace: [],
  tags: [],
  priceLevel: null,
  orders: [],
  rating: null,
  comment: '',
  isSubmitting: false,
}

class NewVisit extends Component {
  state = initialState;

  setValue = (name, value) => this.setState({ [name]: value });
  resetField = (name) => this.setState({ [name]: initialState[name] })

  handleSubmit = () => {
    window.scrollTo({ top: 0 });
    this.setState({ isSubmitting: true });
    setTimeout(() => this.setState({ isSubmitting: true }), 5000);
  }

  render() {
    
    const { isSubmitting } = this.state;

    return (
      <Transition
        native
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {
          isSubmitting
          ? style => <LoadingWrapper style={style}><Loading /></LoadingWrapper>
          : style => (
            <Page style={style}>
              <Article>
                <Title>Plats</Title>
                <SearchPlace onReset={this.resetField} selected={this.state.place} setValue={this.setValue} />
                <SelectTypeOfPlace onSelect={this.setValue} checked={this.state.typesOfPlace} types={TYPE_OF_PLACES} />
                <Tags onAdd={this.setValue} tags={this.state.tags} />
                <PriceLevel onSelect={this.setValue} onReset={this.resetField} selected={this.state.priceLevel} priceLevels={PRICE_LEVELS} />
              </Article>
              <Article>
                <Title>Besök</Title>
                <Orders orders={this.state.orders} onAdd={this.setValue} />
                <Rating ratings={this.state.rating} setValue={this.setValue} tree={RATE_TREE} />
                <Comment setValue={this.setValue} maxLength={COMMENT_MAX_LENGTH} />
              </Article>
              <SubmitButton onClick={this.handleSubmit}>Spara besök</SubmitButton>
            </Page>
          )
        }
      </Transition>
    )
  }
}

export default NewVisit;