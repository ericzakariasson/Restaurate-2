import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { staticMapUrl } from '../../../utils';
import { NavLink } from 'react-router-dom';
import { placeRoute } from 'routes';
import { PlaceDetailsBasic } from 'graphql/types';

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
  align-items: stretch;
  text-decoration: none;
`;

interface MapProps {
  touching: boolean;
  size: number;
  url: string;
}

const Map = styled.div<MapProps>`
  margin-right: 10px;
  border-radius: 5px;
  position: relative;
  flex-shrink: 0;
  transition: 0.15s ease-in-out;
  background-size: 100%;
  background-position: center;
  background-color: #eee;
  width: ${p => p.size}px;
  min-height: ${p => p.size}px;
  /* height: ${p => p.size}px; */
  background-image: url(${p => p.url});
  background-size: 100%;
  background-position: center;

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
  word-break: break-word;
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
  min-width: 0;
  justify-content: center;
`;

const Categories = styled.ul`
  display: flex;
  margin-top: 5px;
  list-style: none;
  max-width: 100%;
  overflow-x: auto;
  padding-right: 10px;
  margin-right: 5px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Category = styled.li`
  list-style: none;
  font-size: 12px;
  padding: 4px 5px;
  background: #f5f5f5;
  color: #666;
  font-weight: 700;
  border-radius: 4px;
  white-space: pre;

  &:not(:last-child) {
    margin-right: 5px;
  }
`;

interface PlaceItemProps {
  place: PlaceDetailsBasic;
  imageSize?: number;
}

export const PlaceItem = ({
  place: { providerId, name, address, position, categories },
  imageSize = 64
}: PlaceItemProps) => {
  const [touching, setTouching] = useState(false);

  const handleTouchStart = () => setTouching(true);
  const handleTouchEnd = () => setTouching(false);

  const size = {
    width: imageSize,
    height: imageSize
  };

  const mapUrl = staticMapUrl({
    ...size,
    ...position,
    retina: true,
    zoom: 12,
    options: {
      logo: false
    }
  });

  return (
    <Item touching={touching}>
      <Link to={placeRoute(providerId)}>
        <Map touching={touching} url={mapUrl} size={imageSize} />
        <Info>
          <Name onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {name}
          </Name>
          <Address>{address}</Address>
          {categories && (
            <Categories>
              {categories.map(category => (
                <Category key={category}>{category}</Category>
              ))}
            </Categories>
          )}
        </Info>
      </Link>
    </Item>
  );
};
