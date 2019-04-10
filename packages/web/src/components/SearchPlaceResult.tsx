import React from 'react';
import styled from 'styled-components';

const Item = styled.li``;

const Name = styled.h3``;

const Address = styled.p``;

const SelectButton = styled.button``;

export type SearchResult = google.maps.places.PlaceResult;

interface SearchPlaceResultProps {
  result: SearchResult;
  select: Function;
}

export const SearchPlaceResult = ({
  result: { id, name, formatted_address },
  select
}: SearchPlaceResultProps) => {
  return (
    <Item>
      <Name>{name}</Name>
      <Address>{formatted_address}</Address>
      <SelectButton onClick={() => select(id)}>Välj</SelectButton>
    </Item>
  );
};
