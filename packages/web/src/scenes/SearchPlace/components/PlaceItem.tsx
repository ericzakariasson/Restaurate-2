import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { staticMapboxMapUrl } from '../../../utils';
import { PlaceSearchItem } from 'graphql/types';
import { NavLink } from 'react-router-dom';
import { placeRoute } from 'routes';

interface ItemProps {
  touching: boolean;
  theme: any;
}

const Item = styled.li<ItemProps>`
  background: #fff;
  border-radius: 8px;
  transition: 0.15s ease-in-out;
  box-shadow: ${p => p.theme.boxShadow};
  border: 1px solid #f5f5f5;

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

const Link = styled(NavLink)`
  padding: 5px;
  display: flex;
  align-items: center;
  text-decoration: none;
`;

interface MapProps {
  touching: boolean;
}

const Map = styled.img<MapProps>`
  margin-right: 10px;
  border-radius: 5px;
  position: relative;
  flex-shrink: 0;
  transition: 0.15s ease-in-out;
  background-size: 100%;
  background-position: center;
  background-color: #eee;
  width: 78px;
  height: 78px;

  ${p =>
    p.touching &&
    css`
      background-size: 120%;
      transition: 0.15s ease-in-out;
    `}
`;

const Name = styled.h4`
  font-size: ${p => p.theme.fontSize.large};
  font-weight: 600;
  margin-bottom: 2px;
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
  padding: 4px 5px;
  background: #f5f5f5;
  color: #666;
  font-weight: 700;
  border-radius: 4px;

  &:not(:last-child) {
    margin-right: 5px;
  }
`;

interface PlaceItemProps {
  place: PlaceSearchItem;
}

export const PlaceItem = ({
  place: { foursquareId, name, address, coordinates, types }
}: PlaceItemProps) => {
  const [touching, setTouching] = useState(false);

  const handleTouchStart = () => setTouching(true);
  const handleTouchEnd = () => setTouching(false);

  const size = {
    width: 78,
    height: 78
  };

  const mapUrl = staticMapboxMapUrl({
    ...size,
    retina: true,
    lat: coordinates.lat,
    lng: coordinates.lng,
    zoom: 12,
    options: {
      logo: false
    }
  });

  return (
    <Item
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      touching={touching}
    >
      <Link to={placeRoute(foursquareId)}>
        <Map touching={touching} src={mapUrl} />
        <Info>
          <Name>{name}</Name>
          <Address>{address}</Address>
          <Types>
            {types.map(type => (
              <Type key={type}>{type}</Type>
            ))}
          </Types>
        </Info>
      </Link>
    </Item>
  );
};
