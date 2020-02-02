import * as React from 'react';
import styled from 'styled-components';
import { Map as MapIcon } from 'react-feather';
import { staticMapUrl } from 'utils';
import { OutboundLink } from 'react-ga';

const MapWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
`;

interface MapCardProps {
  url: string;
}

const MapCard = styled.div<MapCardProps>`
  background: url(${p => p.url}) #f5f5f5;
  width: 100%;
  min-height: 8rem;
  background-size: cover;
  background-position: center;
  border-radius: 0.5rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.5rem;
    height: 0.5rem;
    background: ${p => p.theme.colors.primary.default};
    border-radius: 50%;
  }
`;

const GetDirections = styled(OutboundLink)`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  padding: 0.5rem;
  display: block;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: ${p => p.theme.boxShadow};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  svg {
    stroke-width: 2px;
  }
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
      <GetDirections
        eventLabel="Place Map"
        target="_blank"
        to={directionUrl}
        rel="noopener"
      >
        <MapIcon color="#222" size={20} />
      </GetDirections>
      <MapCard url={mapUrl} />
    </MapWrapper>
  );
};
