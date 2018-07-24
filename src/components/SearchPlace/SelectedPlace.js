import React from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';

import { Name, Address, Select } from './ResultItem';

const Item = styled(animated.div)`
  transform-origin: 50% 0;

  display: flex;
  flex-direction: column;

  position: relative;

  overflow: hidden;
  border-radius: 5px;
  box-shadow: ${p => p.theme.boxShadow};
`;

const BackgroundMap = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;

  &::before {
    position: relative;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:${p => p.theme.place};
    opacity: 0.5;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${p => p.src});
  background-size: contain;
  padding: 20px;
  position: relative;
  z-index: 0;
`;

const ColorOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background: #FFF;
  opacity: 0.5;
`;

const ActionArea = styled.footer`
  width: 100%;
  padding: 15px 20px;
`;

const Deselect = Select.extend`
  padding: 0;
  transform: none;
  color: ${p => p.theme.danger};
`;

const SelectedPlace = ({ style, name, formatted_address, geometry, onDeselect, ...props }) => {

  const { lng, lat } = geometry.location;

  const zoom = 16;
  const scale = 1;
  const width = 600;
  const height = 250;

  console.log('props: ', props);
  const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/${lng()},${lat()},${zoom}.0,0,50/${width}x${height}?access_token=${process.env.MAPBOX_TOKEN}`;

  return (
    <Item style={style}>
      <Content src={mapUrl}>
        <Name>{name}</Name>
        <Address>{formatted_address}</Address>
        <ColorOverlay />
      </Content>
      <ActionArea>
        <Deselect onClick={onDeselect}>Ta bort</Deselect>
      </ActionArea>
    </Item>
  )
}

export default SelectedPlace;