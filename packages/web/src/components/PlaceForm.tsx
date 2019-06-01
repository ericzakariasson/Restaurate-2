import * as React from 'react';
import styled from 'styled-components';
import { X } from 'react-feather';

import { staticMapboxMapUrl } from '../utils';
import { SmallLabel } from './Label';
import { PlaceFormTags } from './PlaceFormTags';
import { PlaceFormPriceLevels } from './PlaceFormPriceLevels';

import { PriceLevel, Tag } from '../types/places';
import { priceLevels } from '../constants';
import { PageTitle } from './PageTitle';

interface ItemProps {}

const Wrapper = styled.section<ItemProps>`
  display: flex;
  flex-direction: column;
`;

const MapWrapper = styled.article`
  position: relative;
  border-radius: 5px;
  background: #fcfcfc;
  overflow: hidden;
  border-bottom: 3px solid ${p => p.theme.colors.primary.hex};
  margin-bottom: 40px;
`;

const Map = styled.img`
  background: #eee;
`;

const MapOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Name = styled.h3`
  margin-bottom: 5px;
  font-size: 1.375rem;
  font-weight: 700;
  text-align: center;
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
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
`;

interface PlaceFormProps {
  place: google.maps.places.PlaceResult;
  deselect: () => void;
  priceLevel: number | undefined;
  setPriceLevel: (priceLevel: number) => void;
  resetPriceLevel: () => void;
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

export const PlaceForm = React.memo(
  ({
    place: { name, formatted_address, geometry },
    deselect,
    priceLevel,
    setPriceLevel,
    resetPriceLevel,
    tags,
    addTag,
    removeTag
  }: PlaceFormProps) => {
    const width = window.innerWidth - 30;
    const height = 150;
    const url = staticMapboxMapUrl({ geometry, width, height, zoom: 13 });

    return (
      <>
        <PageTitle text="Ställe" />
        <Wrapper>
          <MapWrapper style={{ height }}>
            <MapOverlay>
              <Name>{name}</Name>
              <Address>{formatted_address}</Address>
            </MapOverlay>
            <Map src={url} alt={`Karta över ${name}`} />
          </MapWrapper>
          <SmallLabel text="Prisklass" />
          <PlaceFormPriceLevels
            priceLevels={priceLevels}
            priceLevel={priceLevel}
            setPriceLevel={setPriceLevel}
            resetPriceLevel={resetPriceLevel}
          />
          <SmallLabel text="Taggar" />
          <PlaceFormTags removeTag={removeTag} tags={tags} addTag={addTag} />
        </Wrapper>
      </>
    );
  }
);
