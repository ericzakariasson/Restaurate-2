import React from 'react';
import styled from 'styled-components';

interface MarkerProps {
  title: string;
}

const Marker = styled.div<MarkerProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.16));
`;

const Head = styled.div`
  width: 16px;
  height: 16px;
  background-color: ${p => p.theme.colors.primary.hues[0]};
  border-radius: 100%;
  flex: 1 0 auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 100%;
    background: #fff;
    left: 0;
    top: 0;
    transform: translate(3px, 3px);
    opacity: 0.75;
  }
`;

const Needle = styled.div`
  position: relative;
  width: 2px;
  height: 28px;
  background: #eee;
  flex: 1 0 auto;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-2px, 2px) rotateX(55deg);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #333;
    z-index: -1;
  }
`;

interface MapMarkerProps {
  title: string;
}

export const MapMarker = ({ title }: MapMarkerProps) => (
  <Marker title={title}>
    <Head />
    <Needle />
  </Marker>
);
