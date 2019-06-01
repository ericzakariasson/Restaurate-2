import * as React from 'react';
import styled from 'styled-components';
import { SearchPlace } from './SearchPlace';
import { SelectedPlace } from './SelectedPlace';

import { PageTitle } from './PageTitle';
import { Tag } from '../types/places';

const Wrapper = styled.div`
  height: 100%;
`;

export const SelectPlace = () => {
  const [
    selected,
    setSelected
  ] = React.useState<google.maps.places.PlaceResult | null>(null);

  const [priceLevel, setPriceLevel] = React.useState<number | null>(null);

  const [tags, setTags] = React.useState<Tag[] | []>([]);

  const deselect = () => setSelected(null);

  const addTag = (name: string) => {
    const newTags = [...tags, { id: 1, name }] as Tag[];
    setTags(newTags);
  };

  return (
    <Wrapper>
      {selected ? (
        <>
          <PageTitle text="Ställe" />
          <SelectedPlace
            place={selected}
            deselect={deselect}
            selectedPriceLevel={priceLevel}
            setPriceLevel={setPriceLevel}
            tags={tags}
            addTag={addTag}
          />
        </>
      ) : (
        <SearchPlace selected={selected} setSelected={setSelected} />
      )}
    </Wrapper>
  );
};
