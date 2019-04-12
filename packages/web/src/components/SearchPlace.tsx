import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { SearchPlaceResult, SearchResult } from './SearchPlaceResult';

import { useGooglePlaces } from '../hooks';

const Wrapper = styled.div``;

interface ResultsWrapperProp {
  open: boolean;
}

const ResultsWrapper = styled.div`
  box-shadow: ${(p: ResultsWrapperProp) =>
    p.open ? '0 2px 8px rgba(0, 0, 0, 0.16)' : 'none'};
  border-radius: 4px;
  transition: 0.2s ease-in-out;
`;

const Padding = styled.div`
  padding: 5px;
`;

const Input = styled.input`
  display: block;
  padding: 10px 12px;
  border-radius: 4px;
  background: #fcfcfc;
  border: none;
  outline: none;
  font-size: 1rem;
  border: 1px solid #eee;
  width: 100%;
`;

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
    p.active ? p.theme.colors.main[2] : p.theme.colors.main[1]};
  color: #fff;
  font-size: 0.9rem;
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
  padding-top: 1rem;
`;

const TypeLabel = styled.span`
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.8rem;
  padding: 0 15px;
  margin-top: 10px;
  font-weight: 700;
`;

interface SearchPlaceProps {
  selected: SearchResult | null;
  setSelected: (place: SearchResult) => void;
  inputId: string;
}

interface PlaceTypes {
  restaurants: PlaceType;
  cafes: PlaceType;
}

interface PlaceType {
  label: string;
  value: string;
}

const TYPES: PlaceTypes = {
  restaurants: {
    label: 'Restauranger',
    value: 'restaurants'
  },
  cafes: {
    label: 'Caféer',
    value: 'cafes'
  }
};

const BUTTON_HEIGHT = 40;
const PADDING = 25;

export const SearchPlace = ({
  selected,
  setSelected,
  inputId
}: SearchPlaceProps) => {
  const [value, setValue] = useState<string>('');
  const { loading, results, status } = useGooglePlaces(value);
  const [activeType, setActiveType] = useState<PlaceType>(TYPES.restaurants);
  const inputRef = useRef<HTMLInputElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useLayoutEffect(() => {
    if (inputRef.current) {
      const bounds = inputRef.current.getBoundingClientRect();
      const calculatedMaxHeight =
        window.innerHeight -
        (bounds.height + bounds.top + BUTTON_HEIGHT + PADDING);
      setMaxHeight(calculatedMaxHeight);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setValue(e.target.value);

  const displayResults: boolean =
    !loading &&
    !selected &&
    results[activeType.value] &&
    results[activeType.value].length;

  return (
    <Wrapper>
      <ResultsWrapper open={displayResults}>
        <Padding>
          <Input
            ref={inputRef}
            autoFocus
            id={inputId}
            value={value}
            onChange={handleChange}
          />
        </Padding>
        {displayResults ? (
          <Dropdown>
            <Scroll style={{ maxHeight }}>
              <TypeLabel>
                {activeType.label} ({results[activeType.value].length})
              </TypeLabel>
              <Results>
                {results[activeType.value].map((result: SearchResult) => (
                  <SearchPlaceResult
                    key={result.id}
                    select={() => setSelected(result)}
                    result={result}
                  />
                ))}
              </Results>
            </Scroll>
            <Buttons>
              {Object.entries(TYPES).map(([key, type]: [string, PlaceType]) => (
                <TypeButton
                  key={key}
                  active={activeType.value === type.value}
                  onClick={() => setActiveType(type)}
                >
                  {type.label}
                </TypeButton>
              ))}
            </Buttons>
          </Dropdown>
        ) : null}
      </ResultsWrapper>
    </Wrapper>
  );
};
