import React from 'react';
import styled from 'styled-components';

import { Trail, animated, config } from 'react-spring';

import ResultItem from './ResultItem';

const AnimatedWrapper = styled(animated.div)`
  transform-origin: 100% 0;
  position: relative;
  z-index: 11;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  top: 0;
  right: 0;
  width: 100%;
  max-height: calc(100vh - 172px);
  border-radius: 0 0 5px 5px;
  background: #FFF;
  border-top: 1px solid #EEE;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledList = styled.ul`
  list-style: none;
  width: 100%;
  align-self: flex-start;
  overflow: hidden;
`;

const ResultList = ({ results, loading, open, onSelect }) => {
  if (open && loading) {
    return (
      <h1>Laddar</h1>
    )
  }

  if (results.length === 0) {
    return (
      <h1>Inga resultat</h1>
    )
  }

  console.log('results: ', results);

  return (
    <StyledList>
      {results.map(result => <ResultItem onSelect={onSelect} key={result.id} {...result} />)}
    </StyledList >
  )
}

const AnimatedList = ({ style, ...props }) => (
  <AnimatedWrapper style={style}>
    <ResultList {...props} />
  </AnimatedWrapper>
)

export default AnimatedList;