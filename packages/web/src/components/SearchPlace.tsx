import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { X } from 'react-feather';
import { SearchPlaceDropdown } from './SearchPlaceDropdown';
import { useGooglePlaces } from '../hooks';

import { placeTypes } from '../constants';
import { Label } from './Label';
import { Input } from './Input';

import { PageTitle } from './PageTitle';

interface WrapperProps {
  y: number;
}

const Wrapper = styled.div<WrapperProps>`
  transform: translateY(${p => p.y}px);
  transition: 0.15s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const ResultsWrapper = styled.div`
  border-radius: 4px;
  transition: 0.15s ease-in-out;
  width: 100%;
`;

interface FormProps {
  sticky: boolean;
}

const Form = styled.form<FormProps>`
  position: relative;
  width: 100%;
  position: ${p => (p.sticky ? 'sticky' : 'relative')};
  top: ${p => (p.sticky ? 15 : 0)}px;
  z-index: 1;
  transition: 0.2s ease-in-out;

  ${p =>
    p.sticky &&
    css`
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.08);
    `}
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

const NoResults = styled.p`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: #ccc;
  width: 100%;
  padding: 0 15px;
  text-align: center;
`;

interface TextProps {
  hasValue: boolean;
}

const Text = styled.p<TextProps>`
  font-size: 0.9rem;
  color: ${p => (p.hasValue ? '#ccc' : '#aaa')};
  line-height: 1.5;
  text-align: center;
  transition: 0.3s ease-in-out;
  margin-top: 20px;
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

interface SearchPlaceProps {
  selected: google.maps.places.PlaceResult | null;
  setSelected: (place: google.maps.places.PlaceResult) => void;
}

export const SearchPlace = ({ selected, setSelected }: SearchPlaceProps) => {
  const [query, setQuery] = useState<string>('');
  const { loading, places, search, clear, searched } = useGooglePlaces(
    query,
    placeTypes
  );

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
  const noResults = !loading && searched && places.total === 0;
  const showDropdown = !selected && !noResults && places.total > 0;
  const showExtra = places.total === 0 && !searched;
  const searchTop = searched ? 0 : window.innerHeight / 4;
  const inputId = 'search-place-input';

  return (
    <Wrapper y={searchTop}>
      <PageTitle large={!searched} text="Ställe" />
      <Label htmlFor={inputId}>Sök ställe</Label>
      <ResultsWrapper>
        <Form onSubmit={handleSubmit} sticky={showDropdown}>
          <Input
            autoFocus
            id={inputId}
            value={query}
            onChange={handleChange}
            placeholder="Namn eller plats"
          />
          <ClearButton type="button" onClick={handleClear} enabled={hasValue}>
            <X color="#AAA" />
          </ClearButton>
        </Form>
        {showDropdown ? (
          <SearchPlaceDropdown
            types={placeTypes}
            places={places}
            loading={loading}
            setSelected={setSelected}
          />
        ) : noResults ? (
          <NoResults>Inga resultat för "{query}"</NoResults>
        ) : null}
      </ResultsWrapper>
      {showExtra && (
        <>
          <Text hasValue={hasValue}>
            Sök efter restauranger och caféer du besökt
          </Text>
        </>
      )}
    </Wrapper>
  );
};
