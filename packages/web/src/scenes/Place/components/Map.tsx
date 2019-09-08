import * as React from 'react';
import styled from 'styled-components';
import { Map as MapIcon } from 'react-feather';
import { staticMapboxMapUrl } from 'utils';

const MapWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
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
  box-shadow: ${p => p.theme.boxShadow};
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
`;

interface PlaceMapProps {
  lat: number;
  lng: number;
}

export const PlaceMap = ({ lat, lng }: PlaceMapProps) => {
  const mapHeight = window.innerHeight / 2;

  const mapUrl = staticMapboxMapUrl({
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
