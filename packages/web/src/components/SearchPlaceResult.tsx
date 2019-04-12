import React from 'react';
import styled from 'styled-components';

import { staticMapUrl } from '../utils';

const Item = styled.li`
  padding: 10px;
  background: none;
  border-radius: 5px;
  display: flex;
  align-items: center;

  &:not(:last-of-type) {
    margin-bottom: 15px;
  }
`;

const Map = styled.img`
  margin-right: 10px;
  border-radius: 10px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${p => p.theme.colors.main[1]};
  }
`;

const Name = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 5px;
  color: #111;
`;

const Address = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: #333;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export type SearchResult = google.maps.places.PlaceResult;

interface SearchPlaceResultProps {
  result: SearchResult;
  select: Function;
}

export const SearchPlaceResult = ({
  result: { id, name, formatted_address, geometry },
  select
}: SearchPlaceResultProps) => {
  const mapUrl = staticMapUrl({ geometry, zoom: 13, size: '60x60' });
  return (
    <Item onClick={() => select()}>
      <Map src={mapUrl} />
      <Info>
        <Name>{name}</Name>
        <Address>{formatted_address}</Address>
      </Info>
    </Item>
  );
};
