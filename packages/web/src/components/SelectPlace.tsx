import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchPlace } from './SearchPlace';
import { SelectedPlace } from './SelectedPlace';
import { SearchResult } from './SearchPlaceResult';

const Wrapper = styled.div``;

export const SelectPlace = () => {
  const [selected, setSelected] = useState<SearchResult | null>(null);

  const deselect = () => setSelected(null);

  return (
    <Wrapper>
      {selected ? (
        <SelectedPlace place={selected} deselect={deselect} />
      ) : (
        <SearchPlace selected={selected} setSelected={setSelected} />
      )}
    </Wrapper>
  );
};
