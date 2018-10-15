import React from 'react';
import styled from 'styled-components';

import { animated } from 'react-spring';

const StyledItem = styled(animated.li)`
  width: 100%;
  padding: 20px;
  list-style: none;
  display: flex;
  flex-direction: column;
  transition: ${p => p.theme.transition};
  position: relative;
  background: rgba(255,255,255,0.8);

  &:hover {
    background: rgba(255,255,255,0.2);
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid #EEE;
  }
`;

export const Name = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 5px;
  color: #222;
  font-weight: 600;
`;

export const Address = styled.p`
  font-size: 1.6rem;
  color: #222;
  font-weight: 400;
  line-height: 1.2;
`;

const OpenNow = styled.span`
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 700;
  color: green;
  margin-top: 10px;
`;

export const Select = styled.button`
  background: none;
  color: ${p => p.theme.action};
  font-family: ${p => p.theme.fonts.text};
  font-weight: 500;
  font-size: 1.6rem;
  border: none;
  align-self: flex-start;
  padding: 10px;
  transform: translate(-10px, 10px);
  cursor: pointer;
  transition: ${p => p.theme.transition};
  border-radius: 5px;

  &:hover {
    background: #EEE;
  }
`;


const ResultItem = ({ opening_hours, id, name, formatted_address, geometry: { location }, onSelect }) => {

  const { lat, lng } = location;

  const zoom = 16;
  const scale = 1;
  const width = 600;
  const height = 300;
  const key = process.env.GOOGLE_MAPS_API_KEY;

  //const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat()}, ${lng()}&zoom=${zoom}&scale=${scale}&size=${width}x${height}&style=feature:poi|element:labels|visibility:off&key=${key}`
  //const mapUrl2 = `https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/${lng()},${lat()},${zoom}.0,0,0/${width}x${height}?access_token=${process.env.MAPBOX_TOKEN}`;

  return (
    <StyledItem>
      <Name>{name}</Name>
      <Address>{formatted_address}</Address>
      {opening_hours && opening_hours.open_now && <OpenNow>ÖPPET NU</OpenNow>}
      <Select onClick={() => onSelect(id)}>Välj plats</Select>
    </StyledItem>
  )
}

export default ResultItem;