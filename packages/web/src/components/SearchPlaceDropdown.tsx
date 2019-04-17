import React from 'react';
import styled from 'styled-components';
import { SearchPlaceResult, SearchResult } from './SearchPlaceResult';
import { Places } from '../hooks/useGooglePlaces';

import { PlaceType } from '../types/google';

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

  &:disabled {
    color: #ccc;
  }

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

const PlaceCount = styled.span``;

const LoadingBar = styled.div`
  width: 100%;
  background: red;
`;

interface SearchPlaceDropdownProps {
  maxHeight: number;
  activeType: PlaceType;
  types: PlaceType[];
  places: Places;
  loading: boolean;
  setActiveType: Function;
  setSelected: (place: SearchResult) => void;
}

export const SearchPlaceDropdown = ({
  maxHeight,
  activeType,
  types,
  places,
  loading,
  setActiveType,
  setSelected
}: SearchPlaceDropdownProps) => {
  const someResults =
    (places.restaurants && places.restaurants.length > 0) ||
    (places.cafes && places.cafes.length > 0);

  const displayResults: boolean = !loading && someResults;
  const places2: any = places[activeType.value] || [];

  return (
    <Dropdown>
      <Scroll style={{ maxHeight }}>
        {loading ? null : places.length > 0 ? (
          <Results>
            {places2.map((result: SearchResult) => (
              <SearchPlaceResult
                key={result.id}
                select={() => setSelected(result)}
                result={result}
              />
            ))}
          </Results>
        ) : null}
      </Scroll>
      {someResults && (
        <Buttons>
          {Object.entries(types).map(([key, type]: [string, PlaceType]) => (
            <TypeButton
              key={key}
              active={activeType.value === type.value}
              onClick={() => setActiveType(type)}
              disabled={
                places[type.value] === null ||
                (places[type.value] && places[type.value].length === 0)
              }
            >
              {type.label}{' '}
              <PlaceCount>
                ({places[type.value] && places[type.value].length})
              </PlaceCount>
            </TypeButton>
          ))}
        </Buttons>
      )}
    </Dropdown>
  );
};
