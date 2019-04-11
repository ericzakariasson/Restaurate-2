import React from 'react';
import styled from 'styled-components';

const Item = styled.li`
  padding: 10px;
  background: none;
  border-radius: 5px;

  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;

const Name = styled.h4`
  font-size: 1rem;
  font-weight: 700;
`;

const Address = styled.p`
  font-size: 1rem;
  font-weight: 400;
`;

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
    <Item onClick={() => select()}>
      <Name>{name}</Name>
      <Address>{formatted_address}</Address>
    </Item>
  );
};
