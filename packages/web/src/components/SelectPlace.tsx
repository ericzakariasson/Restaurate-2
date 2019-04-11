import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchPlace } from './SearchPlace';
import { SelectedPlace } from './SelectedPlace';
import { SearchResult } from './SearchPlaceResult';

const Wrapper = styled.div``;

const Label = styled.label`
  margin-bottom: 5px;
  display: block;
  text-align: center;
`;

export const SelectPlace = () => {
  const [selected, setSelected] = useState<SearchResult | null>(null);

  const deselect = () => setSelected(null);

  return (
    <Wrapper>
      <Label htmlFor="search-place-input">
        {selected ? 'Valt' : 'Sök'} ställe
      </Label>
      {selected ? (
        <SelectedPlace place={selected} deselect={deselect} />
      ) : (
        <SearchPlace
          inputId="search-place-input"
          selected={selected}
          setSelected={setSelected}
        />
      )}
    </Wrapper>
  );
};
