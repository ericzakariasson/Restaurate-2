import React from 'react';
import styled from 'styled-components';

import ResultItem from './ResultItem';

import { NoResults } from './ListWithType';

const StyledList = styled.ul`
  list-style: none;
  width: 100%;
  align-self: flex-start;
  overflow: hidden;
  flex: 1 0 100%;
  max-height: ${p => p.active ? window.innerHeight + 'px' : '0'};
  transition: 0.5s ease-in-out;
`;

const ResultList = ({ results, onSelect, type, active }) => {

  if (results.length === 0) {
    return (
      <NoResults style={{ flex: '1 0 100%' }}>Inget resultat för {type}</NoResults>
    )
  }

  return (
    <StyledList active={active}>
      {
        results.map(result => <ResultItem onSelect={onSelect} key={result.id} {...result} />)
      }
    </StyledList >
  )
}

export default ResultList;