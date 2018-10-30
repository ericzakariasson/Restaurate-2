import React from 'react';
import styled from 'styled-components';
import ScrollLock from 'react-scrolllock';

import ListWithType from './ListWithType';
import SearchInput from './SearchInput';

import { Transition, animated, config } from 'react-spring';

const SearchPlaceWrapper = styled(animated.div)`
  position: relative;
  z-index: 10;
  transform-origin: 50% 0;
`;

const Results = styled(animated.div)`
  transform-origin: 100% 0;
  top: 60px;
  right: 0;
  position: absolute;
  z-index: 11;
  background: #FFF;
  width: 100%;
  border: 1px solid #F5F5F5;
  border-top: 1px solid #EEE;
  border-radius: 0 0 5px 5px;
  box-shadow: ${p => p.theme.boxShadow};
  max-height: calc(100vh - ${p => p.top}px );
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

const InputWithResultList = ({ style, top, isOpen, onChange, onSubmit, value, onClear, onSelect, restaurants, cafes, loading }) => {
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
              ? style => (
                <Results top={top} style={style}>
                  <ListWithType
                    onSelect={onSelect}
                    cafes={cafes}
                    restaurants={restaurants}
                    loading={loading}
                    open={isOpen} />
                  <ScrollLock />
                </Results>

              )
              : () => null
          }
        </Transition>
      </SearchInput>
      {isOpen && false ? <ScrollLock /> : null}
    </SearchPlaceWrapper>
  )
}

export default InputWithResultList;