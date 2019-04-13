import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { SearchResult } from './SearchPlaceResult';
import { SearchPlaceDropdown } from './SearchPlaceDropdown';
import { useGooglePlaces } from '../hooks';

import { X } from 'react-feather';

const Wrapper = styled.div``;

interface ResultsWrapperProp {
  open: boolean;
}

const ResultsWrapper = styled.div`
  box-shadow: ${(p: ResultsWrapperProp) =>
    p.open ? '0 2px 2px rgba(0, 0, 0, 0.1)' : 'none'};
  border-radius: 4px;
  transition: 0.2s ease-in-out;
`;

const Form = styled.form`
  padding: 5px;
  position: relative;
`;

const Input = styled.input`
  display: block;
  padding: 12px 12px;
  border-radius: 4px;
  background: #f5f5f5;
  border: 1px solid #f5f5f5;
  outline: none;
  font-size: 1.125rem;
  width: 100%;
  transition: 0.15s ease-in-out;

  &:focus {
    background: #fcfcfc;
    border: 1px solid #eee;
    transition: 0.15s ease-in-out;
  }
`;

interface ClearButtonProps {
  enabled: boolean;
}

const ClearButton = styled.button`
  background: none;
  border: none;
  outline: none;
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  opacity: ${(p: ClearButtonProps) => (p.enabled ? 1 : 0.1)};
`;

interface SearchPlaceProps {
  selected: SearchResult | null;
  setSelected: (place: SearchResult) => void;
  inputId: string;
}

export interface PlaceTypes {
  restaurants: PlaceType;
  cafes: PlaceType;
}

export interface PlaceType {
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
  const { loading, results, status, search, clear } = useGooglePlaces(value);
  const [activeType, setActiveType] = useState<PlaceType>(TYPES.restaurants);
  const inputRef = useRef<HTMLInputElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  const someResults =
    (results.restaurants && results.restaurants.length > 0) ||
    (results.cafes && results.cafes.length > 0);

  const displayResults: boolean = !loading && !selected && someResults;

  useLayoutEffect(() => {
    if (inputRef.current) {
      const bounds = inputRef.current.getBoundingClientRect();
      const calculatedMaxHeight =
        window.innerHeight -
        (bounds.height + bounds.top + BUTTON_HEIGHT + PADDING);
      setMaxHeight(calculatedMaxHeight);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    search();
  };

  const handleClear = () => {
    setValue('');
    clear();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setValue(e.target.value);

  return (
    <Wrapper>
      <ResultsWrapper open={displayResults}>
        <Form onSubmit={handleSubmit}>
          <Input
            ref={inputRef}
            autoFocus
            id={inputId}
            value={value}
            onChange={handleChange}
          />
          <ClearButton
            type="button"
            onClick={handleClear}
            enabled={value.length > 0}
          >
            <X />
          </ClearButton>
        </Form>
        {displayResults ? (
          <SearchPlaceDropdown
            maxHeight={maxHeight}
            types={TYPES}
            activeType={activeType}
            results={results}
            setActiveType={setActiveType}
            setSelected={setSelected}
          />
        ) : null}
      </ResultsWrapper>
    </Wrapper>
  );
};
