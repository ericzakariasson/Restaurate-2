import React from 'react';
import styled from 'styled-components';

import { Trail, animated, config } from 'react-spring';

import ResultItem from './ResultItem';

const AnimatedWrapper = styled(animated.div)`
  transform-origin: 100% 0;
  position: absolute;
  z-index: 11;
  box-shadow: ${p => p.theme.boxShadow};
  top: 60px;
  right: 0;
  width: 100%;
  max-height: calc(100vh - 230px);
  border-radius: 0 0 5px 5px;
  background: #FFF;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #F5F5F5;
  border-top: 1px solid #EEE;
`;

const StyledList = styled.ul`
  list-style: none;
  width: 100%;
  align-self: flex-start;
  overflow: hidden;
`;

const NoResults = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 400;
  color: #CCC;
  margin: 40px 0;
`;

const ResultList = ({ restaurants, cafes, loading, open, onSelect }) => {
  if (open && loading) {
    return (
      <h1>Laddar</h1>
    )
  }

  if (restaurants.length === 0 && cafes.length === 0) {
    return (
      <NoResults>Inga resultat</NoResults>
    )
  }

  return (
    <StyledList>
      Restauranger
      {restaurants.map(result => <ResultItem onSelect={onSelect} key={result.id} {...result} />)}
      Cafeer
      {cafes.map(result => <ResultItem onSelect={onSelect} key={result.id} {...result} />)}
    </StyledList >
  )
}

const AnimatedList = ({ style, ...props }) => (
  <AnimatedWrapper style={style}>
    <ResultList {...props} />
  </AnimatedWrapper>
)

export default AnimatedList;