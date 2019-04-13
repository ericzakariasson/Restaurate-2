import React from 'react';
import styled from 'styled-components';
import { SearchPlaceResult, SearchResult } from './SearchPlaceResult';
import { IResults } from '../hooks/useGooglePlaces';

import { PlaceType, PlaceTypes } from './SearchPlace';

const Dropdown = styled.div`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2rem;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );
  }
`;

const Buttons = styled.div`
  display: flex;
  height: 40px;

  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 0;
    width: 100%;
    height: 2rem;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );
  }
`;

interface TypeButtonProps {
  active: boolean;
}

const TypeButton = styled.button`
  flex: 1;
  background: ${(p: TypeButtonProps) => (p.active ? '#DDD' : '#EEE')};
  border: none;
  padding: 8px 10px;
  outline: none;
  background: ${p =>
    p.active ? p.theme.colors.main.hues[1] : p.theme.colors.main.hues[0]};
  color: ${p => p.theme.colors.main.hues[2]};
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:first-child {
    border-radius: 0 0 0 4px;
  }

  &:last-child {
    border-radius: 0 0 4px 0;
  }
`;

const Results = styled.ul`
  list-style: none;
  padding: 10px 5px;
`;

const Scroll = styled.div`
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  /* padding-top: 1rem; */
`;

const TypeLabel = styled.span`
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.8rem;
  padding: 0 15px;
  font-weight: 700;
`;

const PlaceCount = styled.span``;

interface SearchPlaceDropdownProps {
  maxHeight: number;
  activeType: PlaceType;
  types: PlaceTypes;
  results: IResults;
  setActiveType: Function;
  setSelected: (place: SearchResult) => void;
}

export const SearchPlaceDropdown = ({
  maxHeight,
  activeType,
  types,
  results,
  setActiveType,
  setSelected
}: SearchPlaceDropdownProps) => {
  const places: any = results[activeType.value] || [];

  return (
    <Dropdown>
      <Scroll style={{ maxHeight }}>
        <Results>
          {places.length > 0
            ? places.map((result: SearchResult) => (
                <SearchPlaceResult
                  key={result.id}
                  select={() => setSelected(result)}
                  result={result}
                />
              ))
            : null}
        </Results>
      </Scroll>
      <Buttons>
        {Object.entries(types).map(([key, type]: [string, PlaceType]) => (
          <TypeButton
            key={key}
            active={activeType.value === type.value}
            onClick={() => setActiveType(type)}
          >
            {type.label}{' '}
            <PlaceCount>
              ({results[type.value] && results[type.value].length})
            </PlaceCount>
          </TypeButton>
        ))}
      </Buttons>
    </Dropdown>
  );
};
