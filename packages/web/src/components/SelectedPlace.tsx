import React from 'react';
import { SearchResult } from './SearchPlaceResult';
import { staticMapUrl } from '../utils';
import styled from 'styled-components';

interface ItemProps {
  url: string;
}

const Item = styled.article`
  padding: 10px;
  border-radius: 5px;
  background: #f5f5f5;
  background-image: url(${(p: ItemProps) => p.url});
  background-position: center;
  background-size: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
`;

const Name = styled.h3`
  margin-bottom: 5px;
`;

const Address = styled.p``;

interface SelectedPlaceProps {
  place: SearchResult;
  deselect: () => void;
}

const MAP_SIZE: string = `${window.innerWidth - 30}x${85}`;
const MAP_ZOOM: number = 13;

export const SelectedPlace = ({
  place: { name, formatted_address, geometry },
  deselect
}: SelectedPlaceProps) => {
  const url = staticMapUrl({ geometry, size: MAP_SIZE, zoom: MAP_ZOOM });
  return (
    <Item onClick={() => deselect()} url={url}>
      <Name>{name}</Name>
      <Address>{formatted_address}</Address>
    </Item>
  );
};
