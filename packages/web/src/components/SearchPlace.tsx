import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchPlaceResult, SearchResult } from './SearchPlaceResult';

import { useGooglePlaces } from '../hooks';

const Wrapper = styled.div``;

interface ResultsWrapperProp {
  open: boolean;
}

const ResultsWrapper = styled.div`
  box-shadow: ${(p: ResultsWrapperProp) =>
    p.open ? '0 2px 4px rgba(0, 0, 0, 0.08)' : 'none'};
  border-radius: 4px;
  padding: 5px;
  transition: 0.2s ease-in-out;
  position: relative;
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

const Results = styled.ul`
  list-style: none;
  padding-top: 10px;
  position: relative;
`;

interface SearchPlaceProps {
  selected: SearchResult | null;
  setSelected: (place: SearchResult) => void;
  inputId: string;
}

export const SearchPlace = ({
  selected,
  setSelected,
  inputId
}: SearchPlaceProps) => {
  const [value, setValue] = useState<string>('');
  const { loading, results, status } = useGooglePlaces(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setValue(e.target.value);

  const displayResults: boolean = !loading && !selected;
  const displayRestaurants: boolean =
    displayResults && results.restaurants && results.restaurants.length;
  const displayCafes: boolean =
    displayResults && results.cafes && results.cafes.length;

  return (
    <Wrapper>
      <ResultsWrapper open={displayRestaurants || displayCafes}>
        <Input autoFocus id={inputId} value={value} onChange={handleChange} />
        {displayRestaurants ? (
          <Results>
            {results.restaurants.map((result: SearchResult) => (
              <SearchPlaceResult
                key={result.id}
                select={() => setSelected(result)}
                result={result}
              />
            ))}
          </Results>
        ) : null}
      </ResultsWrapper>
    </Wrapper>
  );
};
