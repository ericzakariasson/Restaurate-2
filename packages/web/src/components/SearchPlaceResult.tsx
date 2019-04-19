import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { staticMapboxMapUrl } from '../utils';

interface ItemProps {
  touched: boolean;
  theme: any;
}

const Item = styled.li`
  background: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  transition: 0.15s ease-in-out;

  ${(p: ItemProps) =>
    p.touched &&
    css`
      transform: scale(1.02);
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.08);
    `}

  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`;

interface MapProps {
  url: string;
  touched: boolean;
}

const Map = styled.div`
  margin-right: 10px;
  border-radius: 10px;
  position: relative;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  transition: 0.15s ease-in-out;
  background-size: 100%;
  background-position: center;

  ${(p: MapProps) =>
    p.touched &&
    css`
      background-size: 120%;
      transition: 0.15s ease-in-out;
    `}

  background-image: url(${(p: MapProps) => p.url});

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${p => p.theme.colors.main[1]};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
  }
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
  result: { id, name, formatted_address, geometry },
  select
}: SearchPlaceResultProps) => {
  const [touched, setTouched] = useState(false);

  const handleTouchStart = () => setTouched(true);
  const handleTouchEnd = () => setTouched(false);

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
      touched={touched}
    >
      <Map touched={touched} url={mapUrl} />
      <Info>
        <Name>{name}</Name>
        <Address>{formatted_address}</Address>
      </Info>
    </Item>
  );
};
