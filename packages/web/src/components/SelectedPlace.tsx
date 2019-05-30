import React from 'react';
import styled from 'styled-components';
import { X } from 'react-feather';

import { staticMapboxMapUrl } from '../utils';
import { MapMarker } from './MapMarker';
import { SmallLabel } from './Label';
import { PlaceTags } from './PlaceTags';
import { PlacePriceLevels } from './PlacePriceLevels';

import { PriceLevel, Tag } from '../types/places';
import { priceLevels } from '../constants';

interface ItemProps {}

const Item = styled.article<ItemProps>`
  border-radius: 5px;
  background: #fcfcfc;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Map = styled.img``;

const PlaceInfo = styled.div`
  padding: 10px;
`;

const Name = styled.h3`
  margin-bottom: 5px;
  font-size: 1.5rem;
  font-weight: 700;
`;

const Deselect = styled.button`
  background: #fff7f6;
  border-radius: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  outline: none;
  z-index: 1;

  svg {
    color: ${p => p.theme.colors.error.hex};
  }
`;

const Address = styled.p`
  margin-bottom: 15px;
`;

interface SelectedPlaceProps {
  place: google.maps.places.PlaceResult;
  deselect: () => void;
  activePriceLevel: number | null;
  setPriceLevel: (level: number | null) => void;
  tags: Tag[];
  addTag: (tag: string) => void;
}

export const SelectedPlace = ({
  place: { name, formatted_address, geometry },
  deselect,
  activePriceLevel,
  setPriceLevel,
  tags,
  addTag
}: SelectedPlaceProps) => {
  const width = window.innerWidth - 30;
  const height = Math.floor(width / 2);
  const url = staticMapboxMapUrl({ geometry, width, height, zoom: 13 });

  return (
    <Item>
      <Deselect onClick={() => deselect()}>
        <X />
      </Deselect>
      <MapWrapper>
        <MapMarker title={`${name} – ${formatted_address}`} />
        <Map style={{ width, height }} src={url} alt={`Karta över ${name}`} />
      </MapWrapper>
      <PlaceInfo>
        <Name>{name}</Name>
        <Address>{formatted_address}</Address>
        <SmallLabel>
          Prisklass {activePriceLevel === null && <>(Välj)</>}
        </SmallLabel>
        <PlacePriceLevels
          priceLevels={priceLevels}
          activePriceLevel={activePriceLevel}
          setPriceLevel={setPriceLevel}
        />
        <SmallLabel>Taggar</SmallLabel>
        <PlaceTags tags={tags} addTag={addTag} />
      </PlaceInfo>
    </Item>
  );
};
