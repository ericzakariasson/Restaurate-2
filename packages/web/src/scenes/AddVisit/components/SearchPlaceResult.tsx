import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { staticMapboxMapUrl } from '../../../utils';
import { PlaceSearchItem } from 'graphql/types';

interface ItemProps {
  touching: boolean;
  theme: any;
}

const Item = styled.li<ItemProps>`
  background: none;
  padding: 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: 0.15s ease-in-out;
  box-shadow: ${p => p.theme.boxShadow};
  border: 1px solid #eee;

  ${p =>
    p.touching &&
    css`
      transform: scale(1.02);
      border-color: #aaa;
    `}

  &:not(:last-of-type) {
    margin-bottom: 15px;
  }
`;

interface MapProps {
  touching: boolean;
}

const Map = styled.img<MapProps>`
  margin-right: 10px;
  border-radius: 3px;
  position: relative;
  flex-shrink: 0;
  transition: 0.15s ease-in-out;
  background-size: 100%;
  background-position: center;
  background-color: #eee;

  ${p =>
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
  padding: 5px 0;
`;

const Types = styled.ul`
  display: flex;
  margin-top: 5px;
`;

const Type = styled.li`
  font-size: 12px;
  padding: 5px;
  background: #f5f5f5;
  border-radius: 3px;

  &:not(:last-child) {
    margin-right: 5px;
  }
`;

interface SearchPlaceResultProps {
  place: PlaceSearchItem;
  select: Function;
}

export const SearchPlaceResult = ({
  place: { name, address, coordinates, types },
  select
}: SearchPlaceResultProps) => {
  const [touching, setTouching] = useState(false);

  const handleTouchStart = () => setTouching(true);
  const handleTouchEnd = () => setTouching(false);

  const size = {
    width: 79,
    height: 79
  };

  const mapUrl = staticMapboxMapUrl({
    ...size,
    lat: coordinates.lat,
    lng: coordinates.lng,
    zoom: 12,
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
      <Map style={{ ...size }} touching={touching} src={mapUrl} />
      <Info>
        <Name>{name}</Name>
        <Address>{address}</Address>
        <Types>
          {types.map(type => (
            <Type key={type}>{type}</Type>
          ))}
        </Types>
      </Info>
    </Item>
  );
};
