import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { staticMapboxMapUrl } from '../utils';

interface ItemProps {
  touching: boolean;
  theme: any;
}

const Item = styled.li`
  background: none;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  transition: 0.15s ease-in-out;

  ${(p: ItemProps) =>
    p.touching &&
    css`
      transform: scale(1.02);
      background: #f5f5f5;
    `}

  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;

interface MapProps {
  touching: boolean;
}

const Map = styled.img`
  margin-right: 10px;
  border-radius: 10px;
  position: relative;
  flex-shrink: 0;
  transition: 0.15s ease-in-out;
  background-size: 100%;
  background-position: center;

  ${(p: MapProps) =>
    p.touching &&
    css`
      background-size: 120%;
      transition: 0.15s ease-in-out;
    `}
`;

const Name = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #111;
`;

const Address = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
  color: #666;
  line-height: 1.25;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

interface SearchPlaceResultProps {
  result: google.maps.places.PlaceResult;
  select: Function;
}

export const SearchPlaceResult = ({
  result: { name, formatted_address, geometry },
  select
}: SearchPlaceResultProps) => {
  const [touching, setTouching] = useState(false);

  const handleTouchStart = () => setTouching(true);
  const handleTouchEnd = () => setTouching(false);

  const mapUrl = staticMapboxMapUrl({
    geometry,
    zoom: 12,
    width: 60,
    height: 60,
    options: {
      logo: false
    }
  });

  return (
    <Item
      onClick={() => select()}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      touching={touching}
    >
      <Map style={{ width: 60, height: 60 }} touching={touching} src={mapUrl} />
      <Info>
        <Name>{name}</Name>
        <Address>{formatted_address}</Address>
      </Info>
    </Item>
  );
};
