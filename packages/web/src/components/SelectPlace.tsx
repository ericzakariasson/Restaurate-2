import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchPlace } from './SearchPlace';
import { SelectedPlace } from './SelectedPlace';

import { Tag } from '../types/places';

const Wrapper = styled.div`
  height: 100%;
`;

export const SelectPlace = () => {
  const [
    selected,
    setSelected
  ] = useState<google.maps.places.PlaceResult | null>(null);

  const [priceLevel, setPriceLevel] = useState<number | null>(null);

  const [tags, setTags] = useState<Tag[] | []>([]);

  const deselect = () => setSelected(null);

  const addTag = (name: string) => {
    const newTags = [...tags, { id: 1, name }] as Tag[];
    setTags(newTags);
  };

  return (
    <Wrapper>
      {selected ? (
        <SelectedPlace
          place={selected}
          deselect={deselect}
          activePriceLevel={priceLevel}
          setPriceLevel={setPriceLevel}
          tags={tags}
          addTag={addTag}
        />
      ) : (
        <SearchPlace selected={selected} setSelected={setSelected} />
      )}
    </Wrapper>
  );
};
