import * as React from 'react';
import styled from 'styled-components';
import { Map as MapIcon } from 'react-feather';
import { staticMapUrl } from 'utils';

const MapWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  box-shadow: ${p => p.theme.boxShadow};
  border-radius: 8px;
`;

interface MapCardProps {
  url: string;
}

const MapCard = styled.div<MapCardProps>`
  background: url(${p => p.url}) #f5f5f5;
  width: 100%;
  min-height: 120px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  position: relative;
  box-shadow: inset 0 0 16px rgba(0, 0, 0, 0.08);

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background: ${p => p.theme.colors.primary.default};
    border-radius: 50%;
  }
`;

const GetDirections = styled.a`
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 8px;
  display: block;
  border-radius: 5px;
  background: rgba(34, 34, 34, 0.5);
  box-shadow: ${p => p.theme.boxShadow};
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(3px);
  z-index: 1;
`;

interface PlaceMapProps {
  lat: number;
  lng: number;
}

export const PlaceMap = ({ lat, lng }: PlaceMapProps) => {
  const mapHeight = window.innerHeight / 2;

  const mapUrl = staticMapUrl({
    lat,
    lng,
    zoom: 13,
    width: window.innerWidth - 40,
    height: mapHeight > 120 ? mapHeight : 120
  });

  const directionUrl = `http://www.google.com/maps/place/${lat},${lng}`;

  return (
    <MapWrapper>
      <GetDirections target="_blank" href={directionUrl} rel="noopener">
        <MapIcon color="#FFF" size={20} />
      </GetDirections>
      <MapCard url={mapUrl} />
    </MapWrapper>
  );
};
