import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchPlaceResult, SearchResult } from './SearchPlaceResult';

import { useGooglePlaces } from '../hooks';

const Wrapper = styled.div``;

const Input = styled.input``;

const Results = styled.ul``;

interface Props {}

export const SearchPlace = (props: Props) => {
  const [value, setValue] = useState<string>('');
  const { loading, results, status } = useGooglePlaces(value);
  const [selected, setSelected] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setValue(e.target.value);

  function handleSelect(id: string) {
    setSelected(id);
  }

  const displayRestaurants: boolean = !loading && results.restaurants.length;
  const displayCafes: boolean = !loading && results.cafes.length;

  return (
    <Wrapper>
      <Input value={value} onChange={handleChange} />
      <Results>
        {displayRestaurants
          ? results.restaurants.map((result: SearchResult) => (
              <SearchPlaceResult
                key={result.id}
                select={handleSelect}
                result={result}
              />
            ))
          : null}
      </Results>
    </Wrapper>
  );
};
