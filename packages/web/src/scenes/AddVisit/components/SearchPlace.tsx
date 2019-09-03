import * as React from 'react';
import styled, { css } from 'styled-components';
import { X } from 'react-feather';
import { SearchPlaceDropdown } from './SearchPlaceDropdown';

import { Label } from 'components/Label';
import { Input } from 'components/Input';

import { PageTitle } from 'components';
import {
  PlaceType,
  SearchPlaceDocument,
  SearchPlaceQuery,
  PlaceSearchItem
} from 'graphql/types';

interface WrapperProps {
  y: number;
}

const Wrapper = styled.div<WrapperProps>`
  transform: translateY(${p => p.y}px);
  transition: 0.15s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${p => p.theme.page.padding};
`;

const ResultsWrapper = styled.div`
  border-radius: 4px;
  transition: 0.15s ease-in-out;
  width: 100%;
`;

const LocationInput = styled(Input)`
  margin-top: 10px;
  width: 90%;
`;

interface FormProps {
  sticky: boolean;
}

const Form = styled.form<FormProps>`
  width: 100%;
  position: ${p => (p.sticky ? 'sticky' : 'relative')};
  top: ${p => (p.sticky ? 15 : 0)}px;
  z-index: 1;
  transition: 0.2s ease-in-out;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${p =>
    p.sticky &&
    css`
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.08);
    `}
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
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

const ToggleLocationInput = styled.div`
  margin-left: 8px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 0.85rem;
  padding: 4px 8px;
  font-family: ${p => p.theme.fonts.monospace};
  color: #666;
`;

interface SearchPlaceProps {
  selected: google.maps.places.PlaceResult | null;
  setSelected: (place: google.maps.places.PlaceResult) => void;
  displayLocationSearch: boolean;
  position?: Position;
}

export const SearchPlace = ({
  selected,
  setSelected,
  displayLocationSearch,
  position
}: SearchPlaceProps) => {
  const [query, setQuery] = React.useState<string>('');
  const [location, setLocation] = React.useState<string>('');
  const [places, setPlaces] = React.useState<PlaceSearchItem[]>([]);
  const [searched, setSearched] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [displaylocationInput, setDisplaylocationInput] = React.useState(
    displayLocationSearch
  );

  const variables = {
    filter: {
      query,
      near: location,
      ...(position && {
        position: {
          lat: position && position.coords.latitude,
          lng: position && position.coords.longitude
        }
      })
    }
  };

  const search = async () => {
    // setLoading(true);
    // const { data, loading, errors } = await client.query<SearchPlaceQuery>({
    //   query: SearchPlaceDocument,
    //   variables
    // });
    // const places = data.searchPlace && data.searchPlace.places;
    // if (places) {
    //   setPlaces(places);
    //   setSearched(true);
    // }
    // setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    console.log('submit');

    e.preventDefault();
    search();
  };

  const handleClear = () => {
    setQuery('');
    // clear();
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setQuery(e.target.value);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setLocation(e.target.value);

  const hasValue = query.length > 0;
  const noResults = !loading && searched && places.length === 0;
  const showDropdown = !selected && !noResults && places.length > 0;
  const showExtra = places.length === 0 && !searched && !loading;
  const searchTop = searched ? 0 : window.innerHeight / 4;
  const inputId = 'search-place-input';

  return (
    <Wrapper y={searchTop}>
      <PageTitle large={!searched} title="Ställe" />
      <Label htmlFor={inputId} text="Sök ställe" />
      <ResultsWrapper>
        <Form onSubmit={handleSubmit} sticky={showDropdown}>
          <InputWrapper>
            <Input
              autoFocus
              id={inputId}
              value={query}
              onChange={handleQueryChange}
              placeholder="Namn eller plats"
              type="search"
              fontSize="large"
              name="query"
            />
            <ClearButton type="button" onClick={handleClear} enabled={hasValue}>
              <X color="#AAA" />
            </ClearButton>
          </InputWrapper>
          {displaylocationInput && (
            <LocationInput
              onChange={handleLocationChange}
              value={location}
              name="location"
              fontSize="normal"
              placeholder="Plats"
            />
          )}
          <ToggleLocationInput onClick={() => setDisplaylocationInput(s => !s)}>
            {displaylocationInput ? 'Dölj plats' : 'Visa plats'}
          </ToggleLocationInput>
          <button>Sök</button>
        </Form>
        {loading ? (
          <Text>Laddar...</Text>
        ) : showDropdown ? (
          <SearchPlaceDropdown
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
