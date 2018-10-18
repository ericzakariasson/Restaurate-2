import React from 'react';
import styled from 'styled-components';
import ScrollLock from 'react-scrolllock';

import ResultList from './ResultList';
import SearchInput from './SearchInput';

import { Transition, animated, config } from 'react-spring';

const SearchPlaceWrapper = styled(animated.div)`
  position: relative;
  z-index: 10;
  transform-origin: 50% 0;
`;

const InputWithResultList = ({ style, isOpen, onChange, onSubmit, value, onClear, onSelect, restaurants, cafes, loading }) => {
  return (
    <SearchPlaceWrapper style={style}>
      <SearchInput
        isOpen={isOpen}
        onChange={onChange}
        onSubmit={onSubmit}
        value={value}
        onClear={onClear}
      >
        <Transition
          native
          from={{ opacity: 0.5, transform: 'scale3d(0.25,0.25,0.5)' }}
          enter={{ opacity: 1, transform: 'scale3d(1,1,1)' }}
          leave={{ opacity: 0, transform: 'scale3d(0.25,0.25,0.5)' }}
          config={config.stiff}
        >
          {
            isOpen
              ? style => <ResultList onSelect={onSelect} style={style} cafes={cafes} restaurants={restaurants} loading={loading} open={isOpen} />
              : () => null
          }
        </Transition>
      </SearchInput>
      {isOpen ? <ScrollLock /> : null}
    </SearchPlaceWrapper>
  )
}

export default InputWithResultList;