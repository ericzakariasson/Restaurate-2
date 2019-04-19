import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchPlace } from './SearchPlace';
import { SelectedPlace } from './SelectedPlace';

const Wrapper = styled.div`
  height: 100%;
`;

export const SelectPlace = () => {
  const [
    selected,
    setSelected
  ] = useState<google.maps.places.PlaceResult | null>(null);

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
