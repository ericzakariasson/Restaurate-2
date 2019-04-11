import React from 'react';
import { SearchResult } from './SearchPlaceResult';
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

interface Coordinates {
  lat: number;
  lng: number;
}

const MAP_SIZE: string = `${window.innerWidth - 30}x${65}`;
const MAP_ZOOM: number = 13;

const staticMapUrl = ({ lat, lng }: Coordinates): string => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&size=${MAP_SIZE}&zoom=${MAP_ZOOM}&key=${
    process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  }`;
};

export const SelectedPlace = ({
  place: { name, formatted_address, geometry },
  deselect
}: SelectedPlaceProps) => {
  const location = geometry ? geometry.location : null;
  const url = location
    ? staticMapUrl({ lat: location.lat(), lng: location.lng() })
    : '';

  return (
    <Item onClick={() => deselect()} url={url}>
      <Name>{name}</Name>
      <Address>{formatted_address}</Address>
    </Item>
  );
};
