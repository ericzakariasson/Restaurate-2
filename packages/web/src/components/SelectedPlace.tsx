import React from 'react';
import { SearchResult } from './SearchPlaceResult';
import { staticMapboxMapUrl } from '../utils';
import styled from 'styled-components';

interface ItemProps {
  url: string;
}

const Item = styled.article`
  padding: 15px 10px;
  border-radius: 5px;
  background: #f5f5f5;
  background-image: url(${(p: ItemProps) => p.url});
  background-position: center;
  background-size: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
  position: relative;
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(231, 226, 255, 0.5);
    z-index: -1;
  }
`;

const Name = styled.h3`
  margin-bottom: 5px;
`;

const Address = styled.p``;

interface SelectedPlaceProps {
  place: SearchResult;
  deselect: () => void;
}

export const SelectedPlace = ({
  place: { name, formatted_address, geometry },
  deselect
}: SelectedPlaceProps) => {
  const url = staticMapboxMapUrl({
    geometry,
    width: window.innerWidth - 30,
    height: 85,
    zoom: 13
  });

  return (
    <Item onClick={() => deselect()} url={url}>
      <Name>{name}</Name>
      <Address>{formatted_address}</Address>
    </Item>
  );
};
