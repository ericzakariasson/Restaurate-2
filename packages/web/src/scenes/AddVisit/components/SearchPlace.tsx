import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { X } from 'react-feather';
import { SearchPlaceDropdown } from './SearchPlaceDropdown';
import { useGooglePlaces } from '../../../hooks';

import { placeTypes } from '../../../constants';
import { Label } from '../../../components/Label';
import { Input } from '../../../components/Input';

import { PageTitle } from '../../../components/PageTitle';

interface WrapperProps {
  y: number;
}

const Wrapper = styled.div<WrapperProps>`
  transform: translateY(${p => p.y}px);
  transition: 0.15s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
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
  border-radius: 5px;

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
  font-size: 1rem;
  color: #ccc;
  width: 100%;
  padding: 0 15px;
  text-align: center;
  margin-top: 50%;
`;

interface TextProps {
  hasValue?: boolean;
}

const Text = styled.p<TextProps>`
  font-size: 0.9rem;
  color: ${p => (p.hasValue ? '#ccc' : '#aaa')};
  line-height: 1.5;
  text-align: center;
  transition: 0.3s ease-in-out;
  margin-top: 20px;
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
  const showExtra = places.total === 0 && !searched && !loading;
  const searchTop = searched ? 0 : window.innerHeight / 4;
  const inputId = 'search-place-input';

  return (
    <Wrapper y={searchTop}>
      <PageTitle large={!searched} text="Ställe" />
      <Label htmlFor={inputId} text="Sök ställe" />
      <ResultsWrapper>
        <Form onSubmit={handleSubmit} sticky={showDropdown}>
          <Input
            autoFocus
            id={inputId}
            value={query}
            onChange={handleChange}
            placeholder="Namn eller plats"
            type="search"
          />
          <ClearButton type="button" onClick={handleClear} enabled={hasValue}>
            <X color="#AAA" />
          </ClearButton>
        </Form>
        {loading ? (
          <Text>Laddar...</Text>
        ) : showDropdown ? (
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
