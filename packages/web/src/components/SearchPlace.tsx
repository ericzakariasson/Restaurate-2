import React, { useState, useRef, useLayoutEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { SearchResult } from './SearchPlaceResult';
import { SearchPlaceDropdown } from './SearchPlaceDropdown';
import { useGooglePlaces } from '../hooks';
import { PlaceType } from '../types/google';

import { X, Search } from 'react-feather';
import { Label } from './Label';

interface WrapperProps {
  y: number;
}

const Wrapper = styled.div<WrapperProps>`
  transform: translateY(${p => p.y}px);
  transition: 0.15s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface ResultsWrapperProp {
  open: boolean;
}

const ResultsWrapper = styled.div`
  box-shadow: ${(p: ResultsWrapperProp) =>
    p.open ? '0 2px 2px rgba(0, 0, 0, 0.1)' : 'none'};
  border-radius: 4px;
  transition: 0.15s ease-in-out;
  width: 100%;
`;

const Form = styled.form`
  position: relative;
  width: 100%;
`;

interface InputProps {
  hasValue: boolean;
  dropdownOpen: boolean;
}

const Input = styled.input<InputProps>`
  display: block;
  padding: 15px;
  border-radius: 5px;
  background: #eee;
  border: none;
  outline: none;
  font-size: 1.125rem;
  width: 100%;
  transition: 0.15s ease-in-out;
  height: 50px;

  &:focus {
    background: #f5f5f5;
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
  opacity: ${(p: ClearButtonProps) => (p.enabled ? 1 : 0)};
  transition: 0.15s ease-in-out;
`;

interface TextProps {
  hasValue: boolean;
}

const Text = styled.p<TextProps>`
  font-size: 1rem;
  color: ${p => (p.hasValue ? '#EEE' : '#CCC')};
  line-height: 1.5;
  text-align: center;
  transition: 0.3s ease-in-out;
`;

const pulse = keyframes`
  0% {
    opacity: 1
  }
  50% {
    opacity: 0.5
  }
  100% {
    opacity: 1;
  }
`;

interface IconProps {
  hasValue: boolean;
  loading: boolean;
}

const Icon = styled.div<IconProps>`
  margin-top: 40px;
  margin-bottom: 10px;
  ${p =>
    p.loading &&
    css`
      animation: ${pulse} 2s infinite linear;
    `}

  svg {
    transition: 0.3s ease-in-out;
    color: ${p => (p.hasValue ? p.theme.colors.main.hues[0] : '#eee')};
  }
`;

interface SearchPlaceProps {
  selected: SearchResult | null;
  setSelected: (place: SearchResult) => void;
}

const placeTypes: PlaceType[] = [
  {
    label: 'Restauranger',
    value: 'restaurant'
  },
  {
    label: 'Caféer',
    value: 'cafe'
  }
];

const BUTTON_HEIGHT = 40;
const PADDING = 25;

export const SearchPlace = ({ selected, setSelected }: SearchPlaceProps) => {
  const [query, setQuery] = useState<string>('');
  const { loading, places, search, clear, searched } = useGooglePlaces(
    query,
    placeTypes
  );
  const [activeType, setActiveType] = useState<PlaceType>(placeTypes[0]);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    search();
  };

  const handleClear = () => {
    setQuery('');
    clear();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setQuery(e.target.value);

  const hasValue = query.length > 0;

  const showDropdown = !selected && !loading && places.total > 0;

  const showExtra = places.total === 0 && !searched;

  const searchTop = searched ? 0 : window.innerHeight / 4;

  const inputId = 'search-place-input';

  return (
    <Wrapper y={searchTop}>
      <Label htmlFor={inputId}>Sök ställe</Label>
      <ResultsWrapper open={showDropdown}>
        <Form onSubmit={handleSubmit}>
          <Input
            ref={inputRef}
            autoFocus
            id={inputId}
            value={query}
            hasValue={hasValue}
            dropdownOpen={showDropdown}
            onChange={handleChange}
            placeholder="Namn eller plats"
          />
          <ClearButton type="button" onClick={handleClear} enabled={hasValue}>
            <X color="#AAA" />
          </ClearButton>
        </Form>
        {showDropdown ? (
          <SearchPlaceDropdown
            maxHeight={maxHeight}
            types={placeTypes}
            activeType={activeType}
            places={places}
            loading={loading}
            setActiveType={setActiveType}
            setSelected={setSelected}
          />
        ) : null}
      </ResultsWrapper>
      {showExtra && (
        <>
          <Icon hasValue={hasValue} loading={loading}>
            <Search size={64} />
          </Icon>
          <Text hasValue={hasValue}>
            Sök efter restauranger och caféer du besökt
          </Text>
        </>
      )}
    </Wrapper>
  );
};
